# Uthisha AI Coach

Create a beautiful, fully responsive single-page React web application called \"Uthisha AI\" (Your Multilingual South African Productivity Coach).

### Layout & UI Responsive Architecture:
1. **Sidebar Navigation (Desktop persistent, Mobile sliding drawer)**:
   - On Desktop (screens md and up): Render a dark slate-gray left sidebar (`w-64`) that remains fixed.
   - On Mobile (screens below md): Collapse the sidebar completely and show a top action bar containing a Hamburger menu button. Clicking this button slides out the navigation sidebar as an absolute overlay drawer.
   - **Sidebar Brand**: An abstract glowing book/light logo with the bold title \"Uthisha AI\".
   - **Sidebar Navigation Links** (clicking these switches the main content view panel):
     * 📊 **Dashboard Overview** (Active default)
     * 📥 **Smart Generator** (Smart Email & WhatsApp Generator)
     * 📋 **Daily Planner** (Operation & Routine Tracker)
     * 💬 **Uthisha Chat Coach** (Conversational Tech Mentor)
2. **Main Dashboard View Header (Right Panel / Top Header)**:
   - A sticky header with:
     * App Slogan: \"Your Multilingual South African Productivity Coach\" (hidden on small mobile).
     * Current Mode Badge: A prominent toggle pill or selector button: 💼 **Township SMME** vs 🎓 **Recent Graduate**. Toggling this updates the overall tone and default checklist tasks of the entire app.
     * Language Selector: Dropdown showing flags (🇬🇧 English, 🇿🇦 isiZulu, 🇿🇦 Sesotho, 🇿🇦 isiXhosa).
     * Code-Switch Toggle: A small switch labeled \"Mix Local Phrases 🇿🇦\" (toggled on).
3. **Four Active View Panels (Visual Placeholders - Render depending on active navigation state)**:
   - **View 1: Dashboard Overview Panel**:
     * A beautiful dashboard grid showing a \"Welcome to Uthisha AI\" hero banner, a circular checklist progress summary ring (showing mock \"2 of 4 tasks done\"), and two quick-action cards to launch the Generator or Chat Coach.
   - **View 2: Smart Email & WhatsApp Generator Panel**:
     * An input section with a text area, a \"Select Tone\" pill selector, and a large golden \"Generate Draft\" button with a sparkle icon.
     * A read-only output card showing a simulated draft message with an active \"Copy to Clipboard\" button.
     * A small yellow callout below titled \"💡 Uthisha's Coaching Corner\".
   - **View 3: Daily Operation & Routine Planner Panel**:
     * A circular progress circle indicating checklist percentage.
     * Preloaded checklist items with checkbox slots (tailored to active Mode).
     * An input row to \"Add Custom Task\" with a \"+\" button.
   - **View 4: Uthisha AI Chat Coach Panel**:
     * A vertical chat window with a mock scrollable greeting from Uthisha AI (using a supportive teacher avatar).
     * A horizontal tray of 3 quick-start clickable chips (e.g., \"Explain Profit vs Revenue\", \"Mock Interview Prep\").
     * A text input bar with a \"Send\" icon.

Focus strictly on establishing this responsive shell, the sidebar-toggled active view state, and the static layouts. Do NOT build dynamic logic, backend APIs, or databases yet.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d7f3c50d-0297-4f8e-b40e-53d006f2d913).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
