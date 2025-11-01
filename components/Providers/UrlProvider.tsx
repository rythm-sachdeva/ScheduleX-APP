import { UrlsContext } from "@/context/UrlsContext"
import ConfigData from "../../global/Environments/environments.json"


const UrlProvider = ({children}:{children:React.ReactNode}) => {

  return (
    <UrlsContext.Provider value={ConfigData}>
     {children}
    </UrlsContext.Provider>
  )
}

export default UrlProvider