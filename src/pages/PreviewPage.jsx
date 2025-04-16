import React from "react";

// UI Components
import Button from "../components/ui/Button";

const PreviewPage = () => {
  return (
    <div className="min-h-screen bg-light-grey flex flex-col">
      <section className="bg-purple rounded-b-xl">
        <div className="px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10 min-h-[40vh]">
          <div className="bg-white rounded-lg flex justify-between p-6 md:p-4">
            <Button variant="secondary">Back to Editor</Button>
            <Button variant="primary">Share Link</Button>
          </div>
        </div>
      </section>

      {/* Main content */}
    </div>
  );
};

export default PreviewPage;
