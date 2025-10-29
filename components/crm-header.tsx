import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CRMHeader() {
  return (
    <header className="bg-[#003781] text-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">Allianz</div>
            <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <span className="text-[#003781] text-xs font-bold">⊕</span>
            </div>
            <div className="text-xl font-semibold">CRM</div>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Policies
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Claims
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Services
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Communication
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Settings
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-white/90">10:21 AM</span>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
