"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, Lock, User, AlertTriangle } from "lucide-react";
import makeRequest from "@/Api's/ApiHelper";
import { LoginAdminApiCall } from "@/Api's/repo";
import { setUser, showToast } from "@/redux/actions";
import { encryptData } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeRequest({
        url: LoginAdminApiCall,
        method: "POST",
        data: { email, password },
      });

      const { data } = response;

      if (data.success && data.token && data.result) {
        // Store encrypted user data and token
        const encryptedToken = encryptData(data.token);
        const encryptedUser = encryptData(data.result);

        localStorage.setItem("_st", encryptedToken); // Secure Token
        localStorage.setItem("_su", encryptedUser); // Secure User
        localStorage.setItem("_lt", new Date().toISOString()); // Login Time

        // Update Redux state
        dispatch(setUser(data.result));

        // Show success toast
        toast.success(data.message || "Login successful");

        // Use push to maintain navigation history
        router.push("/admin");
      } else {
        throw new Error(data.error_message || "Login failed");
      }
    } catch (error: any) {
      setError(error.message || "Invalid credentials. Please try again.");
      setLoginAttempts((prev) => prev + 1);

      // Show error toast
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Lock className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-muted-foreground mt-1">
              Safar Capital Administration System
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Login Attempts Warning */}
        {loginAttempts >= 3 && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Multiple failed attempts detected. Please contact support if you
              need assistance.
            </AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Secure Sign In</CardTitle>
            <CardDescription>
              Enter your administrator credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-11 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In to Admin Portal"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-amber-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-800">
                  Security & Compliance Notice
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  This is a secure administrative portal. All login attempts,
                  user activities, and system access are logged and monitored
                  for security and compliance purposes. Unauthorized access
                  attempts will be reported.
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-amber-600">
                  <span>🔒 SSL Encrypted</span>
                  <span>📊 Activity Monitored</span>
                  <span>🛡️ SOC2 Compliant</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Safar Capital. All rights reserved.</p>
          <p className="mt-1">
            Need help? Contact{" "}
            <a
              href="mailto:support@safarcapital.com"
              className="text-red-600 hover:underline"
            >
              support@safarcapital.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
