export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resources for Students</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Know Your Rights</h2>
          <div className="prose prose-blue max-w-none">
            <p>As a student, you have the right to:</p>
            <ul>
              <li>A safe and respectful learning environment</li>
              <li>Fair and equal treatment regardless of background</li>
              <li>Access to academic support and resources</li>
              <li>Appeal grades and academic decisions</li>
              <li>Protection from discrimination and harassment</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Campus Security</h3>
              <p className="text-gray-600">Emergency: 911</p>
              <p className="text-gray-600">Non-Emergency: [Your Campus Security Number]</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Student Support Services</h3>
              <p className="text-gray-600">Counseling Center: [Phone Number]</p>
              <p className="text-gray-600">24/7 Crisis Hotline: [Phone Number]</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Organizations</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Academic Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Student Ombudsman Office</li>
                <li>Academic Advising Center</li>
                <li>Graduate Student Association</li>
                <li>International Student Services</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation Guidelines</h2>
          <div className="prose prose-blue max-w-none">
            <p>When documenting unfair treatment:</p>
            <ol>
              <li>Keep a detailed written record of incidents, including dates, times, and locations</li>
              <li>Save all relevant emails, messages, and communications</li>
              <li>Document names of witnesses if available</li>
              <li>Take notes during or immediately after meetings</li>
              <li>Keep copies of all academic work and feedback</li>
            </ol>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confidentiality Notice</h2>
          <p className="text-gray-700">
            All information shared through this platform is kept strictly confidential and is only accessible to authorized personnel. 
            Your privacy and safety are our top priorities. We follow all relevant data protection and privacy regulations.
          </p>
        </section>
      </div>
    </div>
  );
} 