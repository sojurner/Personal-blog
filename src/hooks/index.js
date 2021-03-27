// ViewCounter.js
import { useEffect, useState } from "react"
import getFirebase from "../utils/firebase"

const useFirebase = dbKey => {
  const [instance, setInstance] = useState(null)
  const [dbTable, setDbTable] = useState(null)

  useEffect(() => {
    const instance = getFirebase(getFirebase().firebase_)
    setInstance(instance)
    setDbTable(instance.database().ref(dbKey))
  }, [dbKey])

  return [instance, dbTable]
}

const usePageView = id => {
  const [firebase, table] = useFirebase("blog")
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    if (!firebase) return

    table.once("value", snapshot => {
      const childRef = snapshot.child(id)
      if (!childRef.exists()) {
        table.set({
          ...snapshot.val(),
          [id]: { views: 1 },
        })
        setViewCount(1)
      } else {
        const pageViews = parseInt(childRef.val().views + 1)
        setViewCount(pageViews)
        table.child(id).set({ views: pageViews })
      }
    })
  }, [id, table, firebase])

  return [viewCount]
}

const usePageViewMeta = () => {
  const [firebase, table] = useFirebase("blog")

  const [viewState, setViewState] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!firebase) return
    setLoading(true)

    table.once("value", snapshot => {
      if (snapshot.exists()) {
        setViewState(snapshot.val())
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [firebase, table])

  return [viewState, loading, error]
}

const useMemeMeta = () => {
  const [firebase, table] = useFirebase("memes")

  const [viewState, setViewState] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updatePoints = (id, val) => {
    const value = val ? 1 : -1

    if (!viewState.hasOwnProperty(id)) {
      table.set({
        ...viewState,
        [id]: { points: value },
      })

      setViewState(state => ({ ...state, [id]: { points: value } }))
    } else {
      const memePoints = parseInt(viewState[id].points + value)
      table.child(id).update({ points: memePoints })

      setViewState(state => ({
        ...state,
        [id]: { points: state[id].points + value },
      }))
    }
  }

  useEffect(() => {
    if (!firebase) return
    setLoading(true)

    table.once("value", snapshot => {
      if (snapshot.exists()) {
        const memeData = snapshot.val()
        setViewState(state => ({ ...state, ...memeData }))
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [firebase, table])

  return [viewState, updatePoints, loading, error]
}

const useMemeView = id => {
  const [firebase, table] = useFirebase("memes")

  const [memePoints, setMemePoints] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updatePoints = val => {
    val = val ? 1 : -1

    table.child(id).update({ points: parseInt(memePoints + val) })
    setMemePoints(state => state + val)
  }

  useEffect(() => {
    if (!firebase || !table) return

    setLoading(true)

    table.once("value", snapshot => {
      if (snapshot.child(id).exists) {
        setMemePoints(snapshot.child(id).val().points)
      } else {
        setMemePoints(0)

        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [firebase, table, id])

  return [memePoints, updatePoints, error, loading]
}

export {
  usePageView,
  usePageViewMeta,
  useMemeMeta,
  useMemeView,
  useFirebase as default,
}
