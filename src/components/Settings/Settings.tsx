import Button from "../Button/Button"
import { X } from "lucide-react"

const Settings = () => {

    function toggleSettings() {

    }

  return (
    <div className="howtoplay h-screen w-screen flex items-center justify-center absolute">
        <div className="h-8/10 w-4/10 border-2 bg-amber-600 p-5">
          <Button iconName={<X />} functionName={toggleSettings} />
        </div>
      </div>
  )
}

export default Settings