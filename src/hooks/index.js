// ViewCounter.js
import { useEffect, useState } from "react"
import getFirebase from "../utils/firebase"

const useFirebase = () => {
  const [instance, setInstance] = useState(null)

  useEffect(() => {
    const instance = getFirebase()
    setInstance(getFirebase(instance.firebase_))
  }, [])

  return instance
}

const usePageView = id => {
  const firebase = useFirebase()
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    if (!firebase) return

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
        const pageViews = parseInt(childRef.val().views + 1)
        setViewCount(pageViews)
        pageRef.child(id).set({ views: pageViews })
      }
    })
  }, [id, firebase])

  return [viewCount]
}

const usePageViewMeta = () => {
  const firebase = useFirebase()

  const [viewState, setViewState] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!firebase) return
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
  }, [firebase])

  return [viewState, loading, error]
}

const useMemeMeta = () => {
  const firebase = useFirebase()

  const [viewState, setViewState] = useState()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updatePoints = (id, val) => {
    if(!firebase) return

    const memeRef = firebase.database().ref("memes")

    memeRef.once("value", snapshot => {
      const childRef = snapshot.child(id)
      const value = val ? 1 : -1;

      // does not exist; create record
      if(!childRef.exists()){
        memeRef.set({
          ...snapshot.val(),
          [id]: {points: value}
        })
        setViewState(state => ({...state, [id]: {points: value}}))
      } else {
        const memePoints = parseInt(childRef.val().points + value)
        setViewState(state => ({...state, [id]: {points: state[id].points + value}}))
        memeRef.child(id).set({ points: memePoints })
      }
    })
  }

  useEffect(() => {
    if (!firebase) return
    setLoading(true)

    const pageRef = firebase.database().ref("memes")
    pageRef.once("value", snapshot => {
      if (snapshot.exists()) {
        const memeData = snapshot.val()
        setViewState(memeData)
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [firebase])

  return [viewState, updatePoints, loading, error]
}

export { usePageView, usePageViewMeta, useMemeMeta, useFirebase as default }
