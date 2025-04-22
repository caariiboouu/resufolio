import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";

export default function SquareTerminalRentals() {
  const terminalCount = 12;
  const pricePerTerminal = 100;
  const location = "Tulsa, Oklahoma";
  
  return (
    <>
      <Head>
        <title>Square Terminal Rentals in Tulsa, OK | $100 Per Day | Same-Day Service</title>
        <meta name="description" content="Rent Square payment terminals in Tulsa for your next event or business need. 12 terminals available at $100 per day. Local service in the Tulsa metro area." />
        <meta name="keywords" content="Square terminal rental, Tulsa payment processing, Square POS rental, event payment system, Tulsa Oklahoma, merchant services, card reader rental" />
        <meta property="og:title" content="Square Terminal Rentals in Tulsa, OK | $100 Per Day" />
        <meta property="og:description" content="Rent Square payment terminals in Tulsa for your next event or business need. 12 terminals available at $100 per day. Local service in the Tulsa metro area." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cuthriell.com/square-terminals" />
        <meta property="og:image" content="/images/square-terminal.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cuthriell.com/square-terminals" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Square Terminal Rentals Tulsa",
            "description": "Rent Square payment terminals in Tulsa for your next event or business need. 12 terminals available at $100 per day.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Tulsa Square Terminal Rentals",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tulsa",
                "addressRegion": "OK",
                "addressCountry": "US"
              },
              "priceRange": "$100 per terminal"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 36.1540,
                "longitude": -95.9928
              },
              "geoRadius": "30 mi"
            },
            "offers": {
              "@type": "Offer",
              "price": "100",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
        `}</script>
      </Head>
      
      <div className="min-h-screen flex flex-col bg-[#E7DECA]">
        <Header />
        
        <main className="flex-grow w-full relative">
          <div className="container max-w-screen-xl mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <section className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#32564f] mb-6">
                  Square Terminal Rentals in Tulsa, Oklahoma
                </h1>
                
                <p className="text-lg md:text-xl text-[#444] mb-6">
                  Need payment processing for your Tulsa event, pop-up shop, or business? Rent professional Square Terminals for just $100 per device.
                </p>
                
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-center mb-6">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-4">
                      <img 
                        src="/SHOP_US_Product_Square_Terminal_Gallery-01.png" 
                        alt="Square Terminal available for rent in Tulsa" 
                        className="rounded-lg shadow-md w-full h-auto"
                      />
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                      <h2 className="text-2xl font-semibold text-[#32564f] mb-3">
                        Professional Payment Solution
                      </h2>
                      <p className="mb-4">
                        Square Terminals are the perfect solution for businesses and events needing reliable payment processing in the Tulsa metro area.
                      </p>
                      <ul className="list-disc list-inside mb-4 space-y-2">
                        <li>Easy to use touchscreen interface</li>
                        <li>Accept all major credit cards</li>
                        <li>Process contactless payments</li>
                        <li>Print receipts instantly</li>
                        <li>Secure, PCI-compliant transactions</li>
                        <li>Wireless connectivity included</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-[#32564f] mb-6">
                  Rental Details
                </h2>
                
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border border-[#32564f]/20 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#32564f] mb-2">Availability</h3>
                      <p className="text-3xl font-bold text-[#54ac9b] mb-2">{terminalCount}</p>
                      <p>Square Terminals</p>
                    </div>
                    
                    <div className="text-center p-4 border border-[#32564f]/20 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#32564f] mb-2">Pricing</h3>
                      <p className="text-3xl font-bold text-[#54ac9b] mb-2">${pricePerTerminal}</p>
                      <p>Per terminal, per day</p>
                    </div>
                    
                    <div className="text-center p-4 border border-[#32564f]/20 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#32564f] mb-2">Service Area</h3>
                      <p className="text-3xl font-bold text-[#54ac9b] mb-2">{location}</p>
                      <p>Tulsa Metro Area</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold text-[#32564f] mb-4">
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Square Terminal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Receipt Paper</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Wrist Strap</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Setup Assistance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Local Delivery and Pickup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#54ac9b] mr-2">✓</span>
                      <span>Two Chargers</span>
                    </li>
                  </ul>
                  
                  <p className="text-sm text-[#666] italic">
                    Note: Square account required.
                  </p>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-[#32564f] mb-6">
                  Perfect For
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Farmers Markets
                    </h3>
                    <p>
                      Process payments quickly at your Tulsa farmers market stand.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Pop-up Shops
                    </h3>
                    <p>
                      Take payments anywhere in the Tulsa area with wireless terminals.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Festivals & Events
                    </h3>
                    <p>
                      Handle high volumes of transactions at Tulsa events and festivals.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Craft Fairs
                    </h3>
                    <p>
                      Increase sales at Tulsa craft fairs with easy payment options.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Food Trucks
                    </h3>
                    <p>
                      Speed up your Tulsa food truck service with fast payment processing.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-5">
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Retail Backup
                    </h3>
                    <p>
                      Have backup payment options for your Tulsa store during peak times.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-[#32564f] mb-6">
                  Book Your Square Terminals
                </h2>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <p className="mb-6">
                    Ready to secure your Square Terminals for your Tulsa event or business needs? Contact us today to check availability and make a reservation.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="mailto:joel@cuthriell.com?subject=Square Terminal Rental Inquiry&body=Hello,%0A%0AI'm interested in renting Square Terminals in Tulsa. Here are my details:%0A%0A- Event date: %0A- Number of terminals needed: %0A- Event location: %0A- Additional requirements: %0A%0AThank you!" 
                      className="bg-[#32564f] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#54ac9b] transition-colors duration-300 text-center w-full sm:w-auto"
                    >
                      Email for Rental Quote
                    </a>
                  </div>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-[#32564f] mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      How far in advance should I book?
                    </h3>
                    <p>
                      Book at least 3-5 days in advance to ensure availability, especially for weekend events in Tulsa. Last-minute rentals may be accommodated based on availability.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Do I need my own Square account?
                    </h3>
                    <p>
                      Yes, you'll need your own Square account to process payments. I can help you set one up if needed, but the account must be in your name or business name.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      Is delivery available?
                    </h3>
                    <p>
                      Yes, I offer delivery and pickup within the Tulsa metro area at no additional charge. For locations outside Tulsa, additional fees may apply.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#32564f] mb-2">
                      What happens if a terminal malfunctions?
                    </h3>
                    <p>
                      I thoroughly test all terminals before rental. In the rare case of a malfunction, reach out immediately and I'll provide a replacement, if available, as quickly as possible.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <footer className="bg-[#32564f] text-white py-6">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm opacity-75">
                © {new Date().getFullYear()} Joel Cuthriell. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 