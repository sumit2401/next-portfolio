"use client"

import InteractiveFolder from "./InteractiveFolder"

export default function FolderDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Interactive 3D Folder Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Hover over the folders to see the file pop-out animation
          </p>
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Blue Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Documents"
              fileCount={12}
              color="blue"
              size="md"
            />
            <InteractiveFolder
              title="Projects"
              fileCount={8}
              color="blue"
              size="lg"
            />
          </div>

          {/* Teal Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Images"
              fileCount={25}
              color="teal"
              size="md"
            />
            <InteractiveFolder
              title="Videos"
              fileCount={6}
              color="teal"
              size="lg"
            />
          </div>

          {/* Purple Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Music"
              fileCount={45}
              color="purple"
              size="md"
            />
            <InteractiveFolder
              title="Downloads"
              fileCount={18}
              color="purple"
              size="lg"
            />
          </div>

          {/* Green Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Code"
              fileCount={32}
              color="green"
              size="md"
            />
            <InteractiveFolder
              title="Design"
              fileCount={14}
              color="green"
              size="lg"
            />
          </div>

          {/* Small Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Temp"
              fileCount={3}
              color="blue"
              size="sm"
            />
            <InteractiveFolder
              title="Backup"
              fileCount={7}
              color="teal"
              size="sm"
            />
          </div>

          {/* Large Folders */}
          <div className="flex flex-col items-center space-y-4">
            <InteractiveFolder
              title="Archive"
              fileCount={156}
              color="purple"
              size="lg"
            />
            <InteractiveFolder
              title="Shared"
              fileCount={89}
              color="green"
              size="lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Interactive Folder Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                🎨 Visual Effects
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 3D perspective with realistic shadows</li>
                <li>• Smooth hover animations</li>
                <li>• File pop-out with staggered timing</li>
                <li>• Glossy, modern appearance</li>
                <li>• Soft glow and depth effects</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                ⚙️ Customization
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Multiple color themes</li>
                <li>• Three size variants (sm, md, lg)</li>
                <li>• Custom file counts</li>
                <li>• Configurable titles</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
              Usage Example:
            </h4>
            <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`<InteractiveFolder
  title="My Documents"
  fileCount={15}
  color="blue"
  size="md"
  className="custom-styles"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

