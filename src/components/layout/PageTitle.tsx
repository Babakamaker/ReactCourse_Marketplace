import { useRenderCount } from "../../hooks/useRenderCount"

const PageTitle = ({ title }: { title: string }) => {
  const renderCount = useRenderCount();

  return (
    <>
      <h1>{title}</h1>
      <h5>PageTitle count: {renderCount}</h5>
    </>
  )
}

export default PageTitle