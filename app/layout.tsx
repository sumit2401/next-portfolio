import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "next-themes"
import { ThemeProvider } from "@/components/theme-provider"
import GlowEffect from "@/components/glow-effect"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Portfolio | Software Engineer",
  description: "Software Engineer specializing in building exceptional digital experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${firaCode.variable} font-sans text-slate antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GlowEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
