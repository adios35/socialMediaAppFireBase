import React from "react";

const Test = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-3">
        <div className="w-1/4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-4">
              <div className="text-xl font-bold text-gray-800">John Doe</div>
              <div className="text-gray-600 text-sm">Web Developer</div>
            </div>
            <img
              className="w-full h-64 object-cover"
              src="https://via.placeholder.com/500x500"
              alt="Cover"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt ex eu mauris euismod, a commodo nulla pretium.
                Maecenas quis mi eu lectus commodo venenatis sed nec ex.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                #foodie
              </span>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="text-xl font-bold text-gray-800">Posts</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Post
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
                <div>
                  <div className="text-gray-800 font-bold">Jane Smith</div>
                  <div className="text-gray-600 text-sm">5 hours ago</div>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt ex eu mauris euismod, a commodo nulla pretium.
                Maecenas quis mi eu lectus commodo venenatis sed nec ex.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
                <div>
                  <div className="text-gray-800 font-bold">Bob Johnson</div>
                  <div className="text-gray-600 text-sm">2 days ago</div>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt ex eu mauris euismod, a commodo nulla pretium.
                Maecenas quis mi eu lectus commodo venenatis sed nec ex.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;
