

export default function ProofLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      <main style={{ paddingTop: '64px' }}>{children}</main>
      {/* <Footer /> */}
    </>
  );
} 