import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import PizzaDetail from "./pages/PizzaDetail";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Team from "./pages/Team";
import History from "./pages/History";
import Careers from "./pages/Careers";
import Locations from "./pages/Locations";
import HowWeWork from "./pages/HowWeWork";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Promotions from "./pages/Promotions";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPizzas from "./pages/admin/AdminPizzas";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminReports from "./pages/admin/AdminReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/pizza/:id" element={<PizzaDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/history" element={<History />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/how-we-work" element={<HowWeWork />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/contacts" element={<Contacts />} />
                
                {/* Админ панель */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="pizzas" element={<AdminPizzas />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;