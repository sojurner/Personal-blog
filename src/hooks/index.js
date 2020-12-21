// ViewCounter.js
import { useEffect, useState } from "react"
import firebase from "firebase"

const usePageView = id => {
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    const pageRef = firebase.database().ref("pages")

    pageRef.once("value", snapshot => {
      const childRef = snapshot.child(id)
      if (!childRef.exists()) {
        pageRef.set({
          ...snapshot.val(),
          [id]: { views: 1 },
        })
        setViewCount(1)
      } else {
        const pageViews = parseInt(childRef.val().views + 1);
        setViewCount(pageViews)
        pageRef.child(id).set({ views: pageViews })
      }
    })
  }, [id])

  return [viewCount]
}

const usePageViewMeta = () => {
  const [viewState, setViewState] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    
    const pageRef = firebase.database().ref("pages")
    pageRef.once("value", snapshot => {
      if (snapshot.exists()) {
        setViewState(snapshot.val())
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [])

  return [viewState, loading, error]
}

export { usePageView, usePageViewMeta }
