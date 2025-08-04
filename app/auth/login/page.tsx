import Link from "next/link"
import { Shield } from "lucide-react"

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to the Login Page</h1>
        <p className="mt-4 text-2xl">Please log in to continue.</p>
        {/* rest of code here */}
      </main>
      <footer className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p className="text-sm text-gray-600">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact Support
          </Link>
        </p>
        <div className="border-t pt-4">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
          >
            <Shield className="h-4 w-4" />
            Admin Portal Access
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LoginPage
