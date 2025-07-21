const generateClassicTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CV - ${data.name || "Your Name"}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: #1f2937; /* text-gray-800 */
  }
</style>
</head>
<body class="p-8 bg-gray-50">
  <div class="max-w-3xl mx-auto font-sans text-gray-800 bg-white p-6 shadow rounded">

    <!-- Header -->
    <header class="border-b-2 border-blue-600 pb-4 mb-6">
      <h1 class="text-3xl font-bold">${data.name || "Your Name"}</h1>
      ${data.role ? `<h2 class="text-xl text-gray-600">${data.role}</h2>` : ""}

      <div class="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
        ${data.email ? `
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ${data.email}
          </div>` : ""}

        ${data.phone ? `
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${data.phone}
          </div>` : ""}

        ${data.linkedin ? `
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            ${data.linkedin.replace(/^https?:\/\//, '')}
          </div>` : ""}
      </div>
    </header>

    <!-- About Me -->
    ${data.aboutMe ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">About Me</h2>
        <p class="text-gray-700">${data.aboutMe}</p>
      </section>
    ` : ""}

    <!-- Experience -->
    ${data.experience?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h2>
        ${data.experience.map(exp => `
          <div class="mb-4">
            <div class="flex justify-between">
              <h3 class="font-bold">${exp.role || ''}</h3>
              <span class="text-gray-600">${exp.duration || ''}</span>
            </div>
            <h4 class="text-gray-700">${exp.company || ''}</h4>
            ${exp.achievements?.length > 0 ? `
              <ul class="list-disc pl-5 mt-2 space-y-1">
                ${exp.achievements.map(ach => `<li class="text-gray-700">${ach}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
    ` : ""}

    <!-- Education -->
    ${data.education?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
        ${data.education.map(edu => `
          <div class="mb-4">
            <h3 class="font-bold">${edu.institution || ''}</h3>
            <p class="text-gray-700">${edu.degree || ''} - ${edu.field || ''}</p>
            <p class="text-gray-600">${edu.startDate || ''} - ${edu.endDate || ''}</p>
          </div>
        `).join('')}
      </section>
    ` : ""}

    <!-- Skills -->
    ${data.skills?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
        <ul class="flex flex-wrap gap-2">
          ${data.skills.map(skill => `
            <li class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${skill.value || skill}</li>
          `).join('')}
        </ul>
      </section>
    ` : ""}

    <!-- Projects -->
    ${data.projects?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h2>
        ${data.projects.map(proj => `
          <div class="mb-4">
            <h3 class="font-bold">${proj.title || ''}</h3>
            <p class="text-gray-700">${proj.description || ''}</p>
            ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Project Link</a>` : ''}
            ${proj.techStack?.length > 0 ? `<p class="mt-1 text-sm text-gray-600">Tech Stack: ${proj.techStack.join(', ')}</p>` : ''}
          </div>
        `).join('')}
      </section>
    ` : ""}

    <!-- Certifications -->
    ${data.certifications?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Certifications</h2>
        ${data.certifications.map(cert => `
          <div class="mb-4">
            <h3 class="font-bold">${cert.title || ''}</h3>
            <p class="text-gray-700">${cert.issuer || ''} - ${cert.year || ''}</p>
          </div>
        `).join('')}
      </section>
    ` : ""}

    <!-- Languages -->
    ${data.languages?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Languages</h2>
        <ul class="list-disc pl-5">
          ${data.languages.map(lang => `<li class="text-gray-700">${lang}</li>`).join('')}
        </ul>
      </section>
    ` : ""}

    <!-- Interests -->
    ${data.interests?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Interests</h2>
        <ul class="list-disc pl-5">
          ${data.interests.map(interest => `<li class="text-gray-700">${interest}</li>`).join('')}
        </ul>
      </section>
    ` : ""}

    <!-- Social Clubs -->
    ${data.socialClubs?.length > 0 ? `
      <section class="mb-6">
        <h2 class="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Social Clubs</h2>
        <ul class="list-disc pl-5">
          ${data.socialClubs.map(club => `<li class="text-gray-700">${club}</li>`).join('')}
        </ul>
      </section>
    ` : ""}
  </div>
</body>
</html>
  `;
};

module.exports = generateClassicTemplate;
