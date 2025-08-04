"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Shield, Zap, Users, TrendingUp } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields((prev) => ({ ...prev, [field]: true }))

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Calculate password strength
    if (field === "password" && typeof value === "string") {
      let strength = 0
      if (value.length >= 8) strength += 25
      if (/[A-Z]/.test(value)) strength += 25
      if (/[0-9]/.test(value)) strength += 25
      if (/[^A-Za-z0-9]/.test(value)) strength += 25
      setPasswordStrength(strength)
    }
  }

  const validateField = (field: string, value: string | boolean) => {
    switch (field) {
      case "firstName":
        return typeof value === "string" && value.length < 2 ? "First name must be at least 2 characters" : ""
      case "lastName":
        return typeof value === "string" && value.length < 2 ? "Last name must be at least 2 characters" : ""
      case "email":
        return typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : ""
      case "password":
        if (typeof value === "string") {
          if (value.length < 8) return "Password must be at least 8 characters"
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
            return "Password must contain uppercase, lowercase, and number"
        }
        return ""
      case "confirmPassword":
        return typeof value === "string" && value !== formData.password ? "Passwords do not match" : ""
      case "agreeToTerms":
        return !value ? "You must agree to the terms and conditions" : ""
      default:
        return ""
    }
  }

  useEffect(() => {
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([field, value]) => {
      if (touchedFields[field]) {
        const error = validateField(field, value)
        if (error) errors[field] = error
      }
    })
    setValidationErrors(errors)
  }, [formData, touchedFields])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mark all fields as touched
    const allFields = Object.keys(formData)
    const newTouchedFields = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    setTouchedFields(newTouchedFields)

    // Validate all fields
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateField(field, value)
      if (error) errors[field] = error
    })

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      router.push("/auth/verify-email")
      setIsLoading(false)
    }, 1500)
  }

  const getFieldIcon = (field: string) => {
    if (touchedFields[field]) {
      return validationErrors[field] ? (
        <AlertCircle className="h-4 w-4 text-red-500" />
      ) : formData[field as keyof typeof formData] ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : null
    }
    return null
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "from-red-500 to-orange-500"
    if (passwordStrength < 75) return "from-yellow-500 to-orange-500"
    return "from-green-500 to-emerald-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  const isFormValid = Object.keys(formData).every(
    (field) => formData[field as keyof typeof formData] && !validationErrors[field],
  )

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <img src="/images/safar-capital-logo.png" alt="Safar Capital" className="h-12 w-auto" />
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Join Thousands of
              <br />
              <span className="text-blue-300">Growing Businesses</span>
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Get instant access to working capital and transform your cash flow with our advanced factoring platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mr-4">
                <Zap className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Approval</h3>
                <p className="text-blue-200">Get approved in minutes, not days</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mr-4">
                <Shield className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bank-Level Security</h3>
                <p className="text-blue-200">Your data is protected with enterprise security</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Competitive Rates</h3>
                <p className="text-blue-200">Industry-leading rates and transparent pricing</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-blue-300" />
              <div>
                <div className="text-2xl font-bold text-blue-300">500+</div>
                <div className="text-sm text-blue-200">Active Businesses</div>
              </div>
            </div>
            <p className="text-blue-100 text-sm italic">
              "Safar Capital transformed our cash flow. We went from waiting 90 days for payments to getting funded in
              24 hours."
            </p>
            <div className="mt-2 text-xs text-blue-300">— Sarah Chen, CEO of TechTrade Inc.</div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/images/safar-capital-logo.png" alt="Safar Capital" className="h-10 w-auto" />
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-600">Join the future of business financing</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium flex items-center gap-2">
                      First Name {getFieldIcon("firstName")}
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`h-12 transition-all duration-200 ${
                        validationErrors.firstName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : touchedFields.firstName && formData.firstName
                            ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium flex items-center gap-2">
                      Last Name {getFieldIcon("lastName")}
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`h-12 transition-all duration-200 ${
                        validationErrors.lastName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : touchedFields.lastName && formData.lastName
                            ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                    Email Address {getFieldIcon("email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-12 transition-all duration-200 ${
                      validationErrors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.email && formData.email
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    required
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                    Password {getFieldIcon("password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`h-12 pr-12 transition-all duration-200 ${
                        validationErrors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : touchedFields.password && formData.password && !validationErrors.password
                            ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Password strength</span>
                        <span
                          className={`font-medium ${passwordStrength >= 75 ? "text-green-600" : passwordStrength >= 50 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {validationErrors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium flex items-center gap-2">
                    Confirm Password {getFieldIcon("confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`h-12 pr-12 transition-all duration-200 ${
                        validationErrors.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : touchedFields.confirmPassword &&
                              formData.confirmPassword &&
                              !validationErrors.confirmPassword
                            ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-medium underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium underline">
                        Privacy Policy
                      </Link>
                    </Label>
                    {validationErrors.agreeToTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.agreeToTerms}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`w-full h-12 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                    isFormValid && !isLoading
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2024 Safar Capital. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
