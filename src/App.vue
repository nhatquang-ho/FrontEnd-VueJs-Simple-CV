<template>
  <div class="container" v-if="dataLoaded">
    <div class="top-bar">
      <div>
        <h1>{{ cv.profile.name }}</h1>
        <div class="meta">{{ cv.profile.title }}</div>
      </div>
      <div>
        <select v-model="lang" @change="loadData">
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>

    <div class="section header">
      <div class="avatar">{{ initials }}</div>
      <div>
        <div class="name">{{ cv.profile.name }}</div>
        <div class="meta">
          {{ cv.contact.location }} • {{ cv.contact.email }} • {{ cv.contact.phone }}
        </div>
        <div class="links">
          <a v-if="cv.contact.linkedin" :href="cv.contact.linkedin" target="_blank">LinkedIn</a>
          <span v-if="cv.contact.linkedin && cv.contact.github"> | </span>
          <a v-if="cv.contact.github" :href="cv.contact.github" target="_blank">GitHub</a>
        </div>
      </div>
    </div>

    <div class="flex section">
      <div class="col">
        <h3>Profile</h3>
        <p>{{ cv.profile.summary }}</p>

        <h3 class="section">Experience</h3>
        <div v-for="exp in cv.experiences" :key="exp.company" class="item">
          <strong>{{ exp.title }}</strong> — <em>{{ exp.company }}</em>
          <div class="meta">{{ exp.period }}</div>
          <p>{{ exp.description }}</p>
        </div>

        <h3 class="section">Education</h3>
        <div v-for="edu in cv.education" :key="edu.school" class="item">
          <strong>{{ edu.degree }}</strong> — {{ edu.school }}
          <div class="meta">{{ edu.period }}</div>
        </div>
      </div>

      <div class="sidebar">
        <h3>Skills</h3>
        <div class="skills">
          <span class="skill" v-for="s in cv.skills" :key="s">{{ s }}</span>
        </div>

        <h3 class="section">Languages</h3>
        <ul>
          <li v-for="l in cv.languages" :key="l.name">{{ l.name }} — {{ l.level }}</li>
        </ul>

        <h3 class="section">Hobbies</h3>
        <ul>
          <li v-for="h in cv.hobbies" :key="h">{{ h }}</li>
        </ul>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading CV data...</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// current language
const lang = ref('fr')

// initialize CV structure safely
const cv = ref({
  profile: { name: '', title: '', summary: '' },
  contact: { phone: '', email: '', location: '', linkedin: '', github: '' },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  hobbies: [],
})

const dataLoaded = ref(false)

// load correct JSON file based on language
async function loadData() {
  dataLoaded.value = false
  try {
    // Use dynamic import so JSON files are bundled by Vite. This avoids
    // runtime 404s when the site is served from a subpath (GitHub Pages).
    // Dynamic import returns a module whose default export contains the JSON.
    const mod = await import(`./data/${lang.value}.json`)
    const json = mod && (mod.default ?? mod)
    cv.value = json
    dataLoaded.value = true
  } catch (err) {
    console.error('Error loading JSON:', err)
  }
}

onMounted(loadData)

// compute initials (example: “NQ”)
const initials = computed(() => {
  const name = cv.value.profile.name || ''
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
h1 {
  margin: 0;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  background: linear-gradient(135deg, #60a5fa, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 28px;
}
.links {
  margin-top: 8px;
}
.sidebar {
  /* Make the sidebar a fixed column on wide screens but flexible overall */
  flex: 0 0 320px;
  max-width: 320px;
}
.item {
  margin-bottom: 12px;
}
.loading {
  padding: 40px;
  text-align: center;
  color: #64748b;
}
@media (max-width: 640px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .avatar {
    width: 72px;
    height: 72px;
  }
  /* Stack main columns and make sidebar full width on small screens */
  .flex {
    flex-direction: column;
    gap: 12px;
  }
  .sidebar {
    flex: none;
    max-width: 100%;
    width: 100%;
  }
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
