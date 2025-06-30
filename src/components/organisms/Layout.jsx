import Header from '@/components/organisms/Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Artistic Background Pattern */}
      <div className="absolute inset-0 bg-texture-paper opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-cinematic"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-artistic rounded-full blur-3xl opacity-10 floating-element"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-celebration rounded-full blur-3xl opacity-15 floating-element" style={{ animationDelay: '3s' }}></div>
      
      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout