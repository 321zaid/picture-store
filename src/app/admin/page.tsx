import { HiShieldCheck } from "react-icons/hi";

const steps = [
  {
    title: "Place your image file",
    description: "Put your image inside the public/images folder.",
    code: "public/images/new-photo.jpg",
  },
  {
    title: "Open the products file",
    description: "Open src/lib/products.ts in your code editor.",
    code: "",
  },
  {
    title: "Add a new product object",
    description:
      'Copy the example below and paste it into the products array. Change the id, title, description, price, category, and imageUrl fields to match your new image. Make sure the id is unique (check the last id in the array and add 1).',
    code: `{
  id: "13",
  title: "New Photo",
  description: "Premium digital photo.",
  price: 12,
  category: "Photography",
  downloadType: "PNG",
  imageUrl: "/images/new-photo.jpg",
  downloadUrl: "/images/new-photo.jpg",
  featured: false,
  createdAt: "2026-05-31"
}`,
  },
  {
    title: "Save the file",
    description: "Save lib/products.ts. The dev server will hot-reload automatically.",
    code: "",
  },
  {
    title: "Run locally",
    description: "Start the development server to preview your changes.",
    code: "npm run dev",
  },
  {
    title: "Push to GitHub",
    description: "Commit and push your changes to deploy.",
    code: `git add .
git commit -m "Add new photo"
git push`,
  },
  {
    title: "Auto-deploy",
    description:
      "If you are using Render, Vercel, or any other hosting connected to your GitHub repo, it will automatically redeploy after the push.",
    code: "",
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
            <HiShieldCheck className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Admin Instructions</h1>
          <p className="text-dark-400">How to add new pictures to the website</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-dark-50 mb-1">{step.title}</h2>
                  <p className="text-dark-400 text-sm mb-3">{step.description}</p>
                  {step.code && (
                    <pre className="bg-dark-800 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-dark-200">{step.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-amber-900/20 border border-amber-800 rounded-lg">
          <p className="text-amber-400 text-sm font-medium mb-1">Warning</p>
          <p className="text-amber-300 text-sm">
            This is a simple manual product system. A real admin upload system with database and protected downloads can be added later.
          </p>
        </div>
      </div>
    </div>
  );
}
