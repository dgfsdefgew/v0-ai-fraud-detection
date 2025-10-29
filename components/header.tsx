import { Shield } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Allianz Fraud Detection</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Risk Analysis System</p>
          </div>
        </div>
      </div>
    </header>
  )
}
