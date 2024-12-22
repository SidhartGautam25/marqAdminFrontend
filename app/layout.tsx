import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";
import { ReportContextProvider } from "./context/reportContext";
import { RDContextProvider } from "./context/rdContext";
import { CondContextProvider } from "./context/submitStateContext";
import { EDITContextProvider } from "./context/Edit/editContext";
import { EditCondContextProvider } from "./context/Edit/editStateContext";

const inter = Roboto_Serif({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marqstats Admin",
  description: "Admin dashboard to control Marqstats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <EditCondContextProvider>
          <EDITContextProvider>
            <AuthContextProvider>
              <RDContextProvider>
                <CondContextProvider>
                  <ReportContextProvider>{children}</ReportContextProvider>
                </CondContextProvider>
              </RDContextProvider>
            </AuthContextProvider>
          </EDITContextProvider>
        </EditCondContextProvider>
      </body>
    </html>
  );
}
