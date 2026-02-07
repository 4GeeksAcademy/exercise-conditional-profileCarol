import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);
  
  // ============================================
  // RENDERIZADO CONDICIONAL
  // ============================================
  
  // 1. COVER: Solo mostrar si includeCover es true
  const coverHTML = variables.includeCover 
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : '<div class="cover"></div>';
  
  // 2. NOMBRE COMPLETO: Solo mostrar si hay nombre O apellido
  let nameHTML = '';
  if (variables.name || variables.lastName) {
    const fullName = `${variables.name || ''} ${variables.lastName || ''}`.trim();
    nameHTML = `<h1>${fullName}</h1>`;
  }
  
  // 3. ROL: Solo mostrar si existe
  const roleHTML = variables.role 
    ? `<h2>${variables.role}</h2>`
    : '';
  
  // 4. UBICACIÓN: Solo mostrar si hay ciudad O país
  let locationHTML = '';
  if (variables.city || variables.country) {
    // Crear array con los valores que existen
    const locationParts = [
      variables.city,
      variables.country
    ].filter(part => part); // Filtrar los null/undefined
    
    // Unir con coma
    const location = locationParts.join(', ');
    locationHTML = `<h3>${location}</h3>`;
  }
  
  // 5. REDES SOCIALES: Solo mostrar las que tienen valor
  const socialIcons = [];
  
  if (variables.twitter) {
    socialIcons.push(`<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`);
  }
  
  if (variables.github) {
    socialIcons.push(`<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`);
  }
  
  if (variables.linkedin) {
    socialIcons.push(`<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`);
  }
  
  if (variables.instagram) {
    socialIcons.push(`<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`);
  }
  
  // Solo mostrar la lista de redes sociales si hay al menos una
  const socialMediaHTML = socialIcons.length > 0
    ? `<ul class="${variables.socialMediaPosition}">
        ${socialIcons.join('')}
      </ul>`
    : '';
  
  // ============================================
  // CONSTRUIR HTML FINAL
  // ============================================
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${coverHTML}
      <img src="${variables.avatarURL}" class="photo" />
      ${nameHTML}
      ${roleHTML}
      ${locationHTML}
      ${socialMediaHTML}
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
