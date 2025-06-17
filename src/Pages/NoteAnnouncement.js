import React, { useEffect, useState } from 'react';

function NoteAnnouncement() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000); // 10 seconds
    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm m-4">
      <p className="font-semibold mb-1">📢 Notice:</p>
      <p className="text-sm leading-relaxed">
        The backend server is currently unavailable as the trial period has ended.
        If you're interested in continuing development or reviewing the source code,
        feel free to request access via GitHub.
      </p>
      <p className="text-sm mt-2">
        📧 Contact: <a href="mailto:ujjwaljha744@gmail.com" className="text-blue-600 underline">ujjwaljha744@gmail.com</a>
      </p>
    </div>
  );
}

export default NoteAnnouncement;
