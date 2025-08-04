"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Mail, CheckCircle, ArrowRight, RefreshCw, Sparkles } from "lucide-react"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resent, setResent] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleResendEmail = async () => {
    setIsResending(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setResent(true)
          setIsResending(false)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleContinue = () => {
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/images/safar-capital-logo.png" alt="Safar Capital" className="h-12 w-auto sm:h-16" />
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="h-10 w-10 text-white" />
            </div>

            {/* Content */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h1>
              <p className="text-gray-600 leading-relaxed">
                We've sent a verification link to your email address. Please click the link to verify your account and
                continue with onboarding.
              </p>
            </div>

            {/* Success Alert */}
            {resent && (
              <Alert className="border-green-200 bg-green-50 mb-6">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Verification email has been resent successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Didn't receive the email? Check your spam folder or resend it.
                </p>

                {/* Resend Button */}
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  {isResending ? (
                    <div className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Resending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </div>
                  )}
                </Button>

                {/* Progress Bar for Resending */}
                {isResending && (
                  <div className="mt-3">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>

              {/* Demo Continue Button */}
              <div className="pt-6 border-t border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">Demo Mode</span>
                  </div>
                  <p className="text-xs text-blue-800 mb-3">
                    For demonstration purposes, you can continue without email verification
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Continue to Onboarding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@safarcapital.com" className="text-blue-600 hover:text-blue-500">
                  support@safarcapital.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Safar Capital. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
