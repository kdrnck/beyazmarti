"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Form submission logic
    console.log("Form submitted:", formData);
    alert("Mesajınız başarıyla gönderildi!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="İletişim"
        subtitle="Bizimle İletişime Geçin"
        description="Sorularınız, önerileriniz veya katılım talepleriniz için bizimle iletişime geçebilirsiniz."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div>
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              İletişim Bilgileri
            </h2>
            
            <div className="space-y-6">
              <Card className="bg-surface/10 border-surface/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-text mb-1">Adres</h3>
                      <p className="text-gray-300">
                        Beyaz Martı Spor Kulübü<br />
                        Spor Kompleksi<br />
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/10 border-surface/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-text mb-1">Telefon</h3>
                      <p className="text-gray-300">+90 (212) 123 45 67</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/10 border-surface/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-text mb-1">E-posta</h3>
                      <p className="text-gray-300">info@beyazmarti.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/10 border-surface/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-text mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-300">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 09:00 - 15:00<br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* İletişim Formu */}
          <div>
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Mesaj Gönderin
            </h2>
            
            <Card className="bg-surface/10 border-surface/20">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Ad Soyad *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-surface/20 border-surface/30 text-text placeholder:text-gray-400"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      E-posta *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-surface/20 border-surface/30 text-text placeholder:text-gray-400"
                      placeholder="E-posta adresinizi girin"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-surface/20 border-surface/30 text-text placeholder:text-gray-400"
                      placeholder="Telefon numaranızı girin"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      Mesaj *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-surface/20 border-surface/30 text-text placeholder:text-gray-400"
                      placeholder="Mesajınızı yazın..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                  >
                    Mesajı Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
