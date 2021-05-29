// ViewCounter.js
import { useEffect, useReducer, useState, useRef } from "react"
import getFirebase from "@utils/firebase"

const useFirebase = dbKey => {
  const [dbTable, setDbTable] = useState(null)

  useEffect(() => {
    const instance = getFirebase()
    setDbTable(instance.database().ref(dbKey))
  }, [dbKey])

  return [dbTable]
}

const usePageView = id => {
  const [table] = useFirebase("blog")
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    if (!table) return
    table
      .child(id)
      .get()
      .then(snapshot => {
        if (!snapshot.exists()) {
          table.set({ ...snapshot.val(), [id]: { views: 1 } })
          setViewCount(1)
        } else {
          const pageViews = parseInt(snapshot.val().views + 1)
          let updates = {}
          updates[`${id}/views`] = pageViews
          table.update(updates)
          setViewCount(pageViews)
        }
      })
  }, [id, table])

  return [viewCount]
}

const usePageViewMeta = () => {
  const [table] = useFirebase("blog/")

  const [viewState, setViewState] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!table) return
    setLoading(true)

    table.get().then(snapshot => {
      if (snapshot.exists()) {
        setViewState(snapshot.val())
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [table])
  return [viewState, loading, error]
}

const useMemeMeta = () => {
  const [table] = useFirebase("memes")

  const [viewState, setViewState] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updatePoints = id => {
    if (!viewState.hasOwnProperty(id)) {
      table.set({
        ...viewState,
        [id]: { points: 1 },
      })

      setViewState(state => ({ ...state, [id]: { points: 1 } }))
    } else {
      const memePoints = parseInt(viewState[id].points + 1)
      table.child(id).update({ points: memePoints })

      setViewState(state => ({
        ...state,
        [id]: { points: state[id].points + 1 },
      }))
    }
  }

  useEffect(() => {
    if (!table) return
    setLoading(true)

    table.get().then(snapshot => {
      if (snapshot.exists()) {
        const memeData = snapshot.val()
        setViewState(state => ({ ...state, ...memeData }))
      } else {
        setError("failed to retrieve data...")
      }
    })

    setLoading(false)
  }, [table])

  return [viewState, updatePoints, loading, error]
}

const useInfiniteScroll = (initialRange, listCount) => {
  const ref = useRef()
  const [itemRange, setItemRange] = useState(initialRange)

  useEffect(() => {
    const cloneRef = ref.current
    if (!cloneRef) return

    const loadMore = () => {
      if (itemRange[1] >= listCount - 1) return
      const { scrollTop, clientHeight, scrollHeight } = cloneRef

      if (scrollTop + clientHeight >= scrollHeight - 500) {
        setItemRange(state => [state[0], state[1] + 3])
      }
    }

    cloneRef.addEventListener("scroll", loadMore)

    return () => cloneRef.removeEventListener("scroll", loadMore)
  }, [ref, itemRange, listCount])

  return [ref, itemRange]
}

const useToggle = (initVal = false) => {
  const [value, dispatch] = useReducer((state) => !state, initVal);

  return [value, dispatch];
};


export {
  useToggle,
  usePageView,
  usePageViewMeta,
  useMemeMeta,
  useInfiniteScroll,
  useFirebase as default,
}
