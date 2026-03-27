import { useState, useRef } from "react"

const BOTS = [
  {
    id: "email",
    icon: "✉",
    label: "Email Writer",
    desc: "Draft professional emails from context",
    color: "#4f9cf9",
    system: `You are a professional email writing assistant. Write clear, concise, professional emails.
Format: Subject line first, then body. Keep it under 200 words unless asked otherwise. No fluff.`,
  },
  {
    id: "resume",
    icon: "◈",
    label: "Resume Analyzer",
    desc: "Match resume to job description",
    color: "#6ee7b7",
    system: `You are a resume and job matching expert. Analyze the resume vs job description.
Give: Match % score, Top 3 strengths, Top 3 gaps, 3 specific action items to improve the resume. Be blunt and concise.`,
  },
  {
    id: "code",
    icon: "</>",
    label: "Code Explainer",
    desc: "Explain any code in plain English",
    color: "#fbbf24",
    system: `You are a code explainer. Explain code clearly for someone learning.
Structure: 1-line summary, then what each part does, then real-world analogy. No jargon unless explained.`,
  },
  {
    id: "linkedin",
    icon: "in",
    label: "LinkedIn Post",
    desc: "Generate viral-worthy LinkedIn posts",
    color: "#c084fc",
    system: `You are a LinkedIn content expert. Generate engaging, authentic LinkedIn posts.
Format: Hook (first line that stops scrolling), body (3-5 short paragraphs), CTA. Use line breaks. No cringe buzzwords.`,
  },
  {
    id: "bug",
    icon: "⚠",
    label: "Bug Fixer",
    desc: "Debug and fix code issues",
    color: "#f87171",
    system: `You are a senior software engineer debugging expert.
Identify the bug, explain why it happens, provide the fixed code, and explain what you changed. Be precise.`,
  },
  {
    id: "tweet",
    icon: "✦",
    label: "Tweet Thread",
    desc: "Turn any topic into a tweet thread",
    color: "#38bdf8",
    system: `You are a Twitter/X content strategist. Convert topics into viral tweet threads.
Format: Hook tweet, then numbered 1/ 2/ 3/ tweets (4-7 total), end with a strong CTA tweet. Max 280 chars each.`,
  },
]

async function callClaude(systemPrompt, userPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content[0].text
}

function EmailBot() {
  const [form, setForm] = useState({ to: "", context: "", tone: "professional" })
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!form.context) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `Write an email to: ${form.to || "the recipient"}\nTone: ${form.tone}\nContext: ${form.context}`
      const res = await callClaude(BOTS[0].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[0]} onRun={run} loading={loading} output={output}>
      <Input label="To (optional)" value={form.to} onChange={v => setForm(f => ({ ...f, to: v }))} placeholder="Boss, HR, Client..." />
      <Select label="Tone" value={form.tone} onChange={v => setForm(f => ({ ...f, tone: v }))} options={["professional", "friendly", "formal", "assertive", "apologetic"]} />
      <Textarea label="Context *" value={form.context} onChange={v => setForm(f => ({ ...f, context: v }))} placeholder="What is this email about? Give context..." rows={4} />
    </BotLayout>
  )
}

function ResumeBot() {
  const [form, setForm] = useState({ resume: "", job: "" })
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!form.resume || !form.job) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `RESUME:\n${form.resume}\n\nJOB DESCRIPTION:\n${form.job}`
      const res = await callClaude(BOTS[1].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[1]} onRun={run} loading={loading} output={output}>
      <Textarea label="Your Resume *" value={form.resume} onChange={v => setForm(f => ({ ...f, resume: v }))} placeholder="Paste your resume text..." rows={4} />
      <Textarea label="Job Description *" value={form.job} onChange={v => setForm(f => ({ ...f, job: v }))} placeholder="Paste the job description..." rows={4} />
    </BotLayout>
  )
}

function CodeBot() {
  const [code, setCode] = useState("")
  const [lang, setLang] = useState("auto-detect")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!code) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `Language: ${lang}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
      const res = await callClaude(BOTS[2].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[2]} onRun={run} loading={loading} output={output}>
      <Select label="Language" value={lang} onChange={setLang} options={["auto-detect", "JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Rust", "PHP", "SQL"]} />
      <Textarea label="Code *" value={code} onChange={setCode} placeholder="Paste your code here..." rows={6} mono />
    </BotLayout>
  )
}

function LinkedInBot() {
  const [form, setForm] = useState({ topic: "", style: "storytelling" })
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!form.topic) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `Topic: ${form.topic}\nStyle: ${form.style}`
      const res = await callClaude(BOTS[3].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[3]} onRun={run} loading={loading} output={output}>
      <Textarea label="Topic *" value={form.topic} onChange={v => setForm(f => ({ ...f, topic: v }))} placeholder="E.g. How I built my first SaaS in 30 days..." rows={3} />
      <Select label="Style" value={form.style} onChange={v => setForm(f => ({ ...f, style: v }))} options={["storytelling", "tips & tricks", "opinion", "motivational", "technical deep-dive", "case study"]} />
    </BotLayout>
  )
}

function BugBot() {
  const [form, setForm] = useState({ code: "", error: "" })
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!form.code) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `Code with bug:\n\`\`\`\n${form.code}\n\`\`\`\n${form.error ? `\nError message: ${form.error}` : ""}`
      const res = await callClaude(BOTS[4].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[4]} onRun={run} loading={loading} output={output}>
      <Textarea label="Buggy Code *" value={form.code} onChange={v => setForm(f => ({ ...f, code: v }))} placeholder="Paste the code with the bug..." rows={5} mono />
      <Textarea label="Error Message (optional)" value={form.error} onChange={v => setForm(f => ({ ...f, error: v }))} placeholder="Paste any error or describe the bug..." rows={2} />
    </BotLayout>
  )
}

function TweetBot() {
  const [form, setForm] = useState({ topic: "", audience: "developers" })
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!form.topic) return
    setLoading(true)
    setOutput("")
    try {
      const prompt = `Topic: ${form.topic}\nTarget audience: ${form.audience}`
      const res = await callClaude(BOTS[5].system, prompt)
      setOutput(res)
    } catch (e) {
      setOutput("Error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <BotLayout bot={BOTS[5]} onRun={run} loading={loading} output={output}>
      <Textarea label="Topic *" value={form.topic} onChange={v => setForm(f => ({ ...f, topic: v }))} placeholder="E.g. Why every dev should learn system design..." rows={3} />
      <Select label="Target Audience" value={form.audience} onChange={v => setForm(f => ({ ...f, audience: v }))} options={["developers", "founders", "designers", "students", "marketers", "general"]} />
    </BotLayout>
  )
}

function BotLayout({ bot, children, onRun, loading, output }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
      <button
        onClick={onRun}
        disabled={loading}
        style={{
          background: bot.color,
          color: "#000",
          border: "none",
          borderRadius: 8,
          padding: "10px 20px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          fontSize: 13,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s",
          letterSpacing: "0.5px",
        }}
      >
        {loading ? "▸ Generating..." : "▸ Run Bot"}
      </button>

      {output && (
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>output</span>
            <button
              onClick={copy}
              style={{ background: "transparent", border: "1px solid #333", borderRadius: 5, padding: "3px 10px", color: copied ? bot.color : "#666", fontSize: 12, cursor: "pointer", fontFamily: "monospace", transition: "color 0.2s" }}
            >
              {copied ? "✓ copied" : "copy"}
            </button>
          </div>
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1e1e1e",
              borderRadius: 8,
              padding: 16,
              whiteSpace: "pre-wrap",
              fontFamily: "Georgia, serif",
              fontSize: 14,
              lineHeight: 1.8,
              color: "#e0e0e0",
              maxHeight: 360,
              overflowY: "auto",
            }}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  )
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontFamily: "monospace", color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 7, padding: "9px 12px", color: "#e0e0e0", fontSize: 13, fontFamily: "system-ui", outline: "none", boxSizing: "border-box" }}
      />
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontFamily: "monospace", color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 7, padding: "9px 12px", color: "#e0e0e0", fontSize: 13, fontFamily: "system-ui", outline: "none", cursor: "pointer", boxSizing: "border-box" }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder, rows = 3, mono = false }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontFamily: "monospace", color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%", background: "#111", border: "1px solid #222", borderRadius: 7,
          padding: "9px 12px", color: "#e0e0e0", fontSize: 13,
          fontFamily: mono ? "'JetBrains Mono', 'Fira Code', monospace" : "system-ui",
          outline: "none", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box",
        }}
      />
    </div>
  )
}

const BOT_COMPONENTS = {
  email: EmailBot,
  resume: ResumeBot,
  code: CodeBot,
  linkedin: LinkedInBot,
  bug: BugBot,
  tweet: TweetBot,
}

export default function AutoBotStudio() {
  const [active, setActive] = useState("email")
  const ActiveBot = BOT_COMPONENTS[active]
  const activeData = BOTS.find(b => b.id === active)

  return (
    <div style={{ display: "flex", height: "100vh", background: "#080808", color: "#e0e0e0", fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#0d0d0d", borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "2px", marginBottom: 4 }}>AUTOBOT</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, background: "linear-gradient(90deg, #4f9cf9, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>STUDIO</div>
        </div>

        <div style={{ padding: "16px 0", flex: 1 }}>
          <div style={{ padding: "0 20px", fontSize: 10, color: "#444", letterSpacing: "1.5px", fontFamily: "monospace", marginBottom: 8 }}>BOTS</div>
          {BOTS.map(bot => (
            <button
              key={bot.id}
              onClick={() => setActive(bot.id)}
              style={{
                width: "100%",
                background: active === bot.id ? "#161616" : "transparent",
                border: "none",
                borderLeft: active === bot.id ? `2px solid ${bot.color}` : "2px solid transparent",
                padding: "10px 18px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: active === bot.id ? bot.color : "#555", minWidth: 24 }}>{bot.icon}</span>
                <div>
                  <div style={{ fontSize: 13, color: active === bot.id ? "#e0e0e0" : "#888", fontWeight: active === bot.id ? 500 : 400 }}>{bot.label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ padding: "0 20px", borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
          <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", letterSpacing: "1px" }}>Powered by Claude API</div>
        </div>
      </div>

      {/* Main Panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "20px 28px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#111", border: `1px solid ${activeData.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 13, color: activeData.color }}>
            {activeData.icon}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f0f0f0" }}>{activeData.label}</div>
            <div style={{ fontSize: 12, color: "#555" }}>{activeData.desc}</div>
          </div>
        </div>

        {/* Bot Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <ActiveBot />
        </div>
      </div>
    </div>
  )
}
