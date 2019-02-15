import { useState, useEffect } from "react";
function useFetcher(action) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  async function loadData() {
    try {
      setLoading(true);
      const actionData = await action();
      setData(actionData.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadData();
  }, [action]);
  return [data, loading, error];
}
export default useFetcher;
