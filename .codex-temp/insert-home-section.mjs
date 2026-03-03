import fs from "fs";
const path = "src/pages/Home.jsx";
let c = fs.readFileSync(path, "utf8");
const insert = `<Suspense fallback={null}>
        <section aria-label="Nova experiência da plataforma">
          <UpdatedExperienceSection />
        </section>
`;
c = c.replace("<Suspense fallback={null}>", insert);
fs.writeFileSync(path, c, "utf8");
