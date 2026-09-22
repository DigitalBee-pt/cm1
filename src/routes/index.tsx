import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Award,
  Check,
  Globe,
  Laptop,
  Leaf,
  Send,
  ShieldCheck,
  Sprout,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { submitContactRequest } from "@/lib/contact.functions";

import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import botanical from "@/assets/botanical-line-art.png";
import catarinaMexia from "@/assets/catarina-mexia.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terapia de Casal Online | Catarina Mexia, Psicóloga Clínica" },
      {
        name: "description",
        content:
          "Terapia de casal online com Catarina Mexia, psicóloga clínica com mais de 30 anos de experiência. Peça disponibilidade para uma primeira conversa.",
      },
      { property: "og:title", content: "Terapia de Casal Online | Catarina Mexia" },
      {
        property: "og:description",
        content:
          "Um espaço para compreender o que está a acontecer entre vocês — sem procurar culpados. Consultas online em Portugal e no estrangeiro.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/351917297505?text=" +
  encodeURIComponent("Olá, gostaria de pedir disponibilidade para uma primeira conversa.");

const trustItems = [
  { icon: User, text: "Psicóloga Clínica" },
  { icon: Award, text: "Mais de 30 anos\nde experiência" },
  { icon: Sprout, text: "Terapia\nSistémica" },
  { icon: Laptop, text: "Consultas online\nem Portugal e no estrangeiro" },
];

const recognitions = [
  "Discutem sempre pelos mesmos motivos e nenhum de vocês se sente ouvido.",
  "Há distância emocional, mas também medo de se afastarem de vez.",
  "Sentem-se mais em modo “gestão da casa e dos filhos” do que como parceiros.",
  "Pensam em terminar, mas ainda esperam que algo mude.",
];

const steps = [
  {
    n: "01",
    title: "Primeiro contacto",
    text: "Após o pedido, confirmamos a disponibilidade e as condições para a primeira consulta online.",
  },
  {
    n: "02",
    title: "Avaliação",
    text: "Exploramos a história da relação, os padrões atuais e o que cada um necessita para se sentir melhor.",
  },
  {
    n: "03",
    title: "Trabalho terapêutico",
    text: "Definimos objetivos claros e trabalhamos, ao vosso ritmo, competências de comunicação, ligação emocional e tomadas de decisão.",
  },
];

const faqs = [
  {
    q: "É preciso que os dois estejam de acordo?",
    a: "O ideal é que ambos participem, mas é possível começar com um primeiro contacto individual para perceber como avançar.",
  },
  {
    q: "Como funcionam as consultas online?",
    a: "As sessões decorrem por videochamada, num link privado. Basta terem um espaço reservado e uma ligação estável.",
  },
  {
    q: "A terapia decide se devemos ficar juntos?",
    a: "Não. O objetivo é dar-vos clareza e liberdade para decidirem, com mais respeito por vocês e pela relação.",
  },
  {
    q: "Temos de contar tudo no primeiro contacto?",
    a: "Não precisa de explicar a situação nesta fase. Basta pedir disponibilidade — o resto falamos na consulta.",
  },
];

function Index() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [sending, setSending] = useState(false);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      toast.error("Preencha o nome e o email, por favor.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      toast.error("Introduza um email válido, por favor.");
      return;
    }
    if (form.telefone && !/^\d{9}$/.test(form.telefone)) {
      toast.error("O telefone deve ter 9 dígitos.");
      return;
    }
    setSending(true);
    try {
      await submitContactRequest({ data: form });
      toast.success("Pedido enviado. Entraremos em contacto em breve.");
      setForm({ nome: "", email: "", telefone: "" });
    } catch {
      toast.error("Não foi possível enviar o pedido. Tente novamente ou fale connosco no WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />

      {/* Header + Hero */}
      <header className="border-b border-border/60 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-serif text-2xl tracking-tight">Catarina Mexia</span>
          <p className="hidden text-sm tracking-wide text-muted-foreground sm:block">
            Psicóloga Clínica · Consultas online
          </p>
        </div>
      </header>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
              Terapia de casal
            </p>
            <h1 className="mt-5 font-serif text-[2rem] leading-[1.1] sm:text-[2.5rem] lg:text-[2.75rem]">
              Quando conversar
              <br />
              já não parece chegar
            </h1>
            <p className="mt-6 font-serif text-xl leading-relaxed text-brand sm:text-2xl">
              Um espaço para compreender o que está a acontecer entre vocês — sem procurar
              culpados.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A terapia de casal ajuda-vos a sair do ciclo de discussões, reconstruir a ligação e
              tomar decisões mais conscientes sobre o vosso futuro.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <img
                src={catarinaMexia.url}
                alt="Fotografia de Catarina Mexia, psicóloga clínica"
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-secondary"
              />
              <p className="text-sm text-muted-foreground">
                Catarina Mexia · Psicóloga Clínica · mais de 30 anos de experiência
              </p>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-sm bg-card p-7 shadow-[0_18px_50px_-30px_oklch(0.3_0.06_25/0.45)] sm:p-9">
            <h2 className="font-serif text-3xl">Pedir disponibilidade</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="nome" className="text-sm text-muted-foreground">
                  Nome
                </label>
                <Input
                  id="nome"
                  placeholder="O seu nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="h-12 rounded-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="O seu email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 rounded-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="telefone" className="text-sm text-muted-foreground">
                  Telefone
                </label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="O seu telefone"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      telefone: e.target.value.replace(/\D/g, "").slice(0, 9),
                    })
                  }
                  inputMode="numeric"
                  maxLength={9}
                  className="h-12 rounded-sm"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-2 w-full rounded-sm bg-brand px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "A enviar..." : "Ver disponibilidade"}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Não precisa de explicar a situação nesta fase.
              </p>
            </form>

            <div className="mt-7 border-t border-border pt-6">
              <a
                href={WHATSAPP_URL}
                className="flex items-center gap-2 text-sm font-medium hover:text-brand"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                  <Send className="h-3 w-3 text-brand-foreground" aria-hidden="true" />
                </span>
                Prefere falar no WhatsApp?
              </a>
              <a
                href={WHATSAPP_URL}
                className="mt-4 flex items-center justify-between rounded-sm border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-brand"
              >
                Escreva a sua mensagem...
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
                  <Send className="h-4 w-4 text-brand-foreground" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="border-t border-border/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trustItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 lg:px-6 lg:first:pl-0">
                <Icon className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.2} aria-hidden="true" />
                <p className="whitespace-pre-line text-sm leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">Talvez se reconheçam</h2>
          <p className="mt-2 font-serif text-xl text-brand">
            Há padrões que acabam por ocupar toda a relação
          </p>
          <ul className="mt-9 grid gap-6 sm:grid-cols-2 sm:gap-x-14">
            {recognitions.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand">
                  <Check className="h-3 w-3 text-brand" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">Como funciona</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-brand/25">
            {steps.map((s) => (
              <div key={s.n} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-4xl text-brand">{s.n}</span>
                  <h3 className="font-serif text-xl">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:pl-16">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">O que procuramos compreender</h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Cada relação tem a sua história, o seu contexto e as suas feridas. Mais do que
              encontrar culpados, procuramos entender o que está por detrás dos comportamentos.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Compreender não é justificar: é ganhar clareza para decidirem com mais liberdade e
              respeito por vocês e pela relação.
            </p>
          </div>
          <img
            src={botanical}
            alt="Ilustração de linhas com ramos e um coração"
            loading="lazy"
            width={1024}
            height={768}
            className="w-full"
          />
        </div>
      </section>

      {/* About */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={catarinaMexia.url}
              alt="Fotografia real da psicóloga Catarina Mexia"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
              Quem vos acompanha
            </p>
            <h2 className="mt-3 font-serif text-4xl">Catarina Mexia</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Psicóloga Clínica com mais de 30 anos de experiência no acompanhamento de adultos,
              casais e famílias.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Trabalho com uma abordagem sistémica e integrativa, incluindo formação avançada em
              EMDR para trauma e experiências que continuam a afetar o presente.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { icon: Leaf, label: "Terapeuta Sistémica" },
                { icon: Globe, label: "Terapeuta EMDR" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm"
                >
                  <Icon className="h-4 w-4 text-brand" strokeWidth={1.4} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">Antes da primeira consulta</h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-sm hover:text-brand">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 lg:flex-row">
          <h2 className="font-serif text-2xl leading-snug sm:text-3xl">
            Se sentir que este pode ser o momento certo para procurar ajuda, estou disponível para vos acompanhar 
          </h2>
          <div className="flex flex-col items-center gap-3">
            <a
              href="#top"
              className="rounded-sm bg-brand px-10 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-foreground transition-opacity hover:opacity-90"
            >
              Ver disponibilidade
            </a>
            <a
              href={WHATSAPP_URL}
              className="flex items-center gap-2 text-sm text-brand hover:underline"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-start gap-2 opacity-80">
            <ShieldCheck className="h-5 w-5 shrink-0" strokeWidth={1.3} aria-hidden="true" />
            Cédula Profissional
            <br />
            1669
          </p>
          <p className="flex items-start gap-2 opacity-80">
            <Award className="h-5 w-5 shrink-0" strokeWidth={1.3} aria-hidden="true" />
            Registo ERS
            <br />
            E151039
          </p>
          <p className="flex items-start gap-2 opacity-80">
            <Laptop className="h-5 w-5 shrink-0" strokeWidth={1.3} aria-hidden="true" />
            Consultas online
            <br />
            Portugal e estrangeiro
          </p>
          <div className="space-y-1 opacity-80">
            <a
              href="https://catarinamexia.com/politica-de-privacidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Política de Privacidade
            </a>
            <a
              href="https://catarinamexia.com/termos-e-condicoes/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Termos e Condições
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
