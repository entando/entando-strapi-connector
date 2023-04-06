import React from "react"

const FormMocked = () => {
  return (
    <>
      <div className="main-container bg-gray-100">
        <div className="top-container shadow bg-white mb-10 py-10 px-10 border-b-black">
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <a>epc</a>
              </li>
              <li>
                <a>Strapi</a>
              </li>
              <li>Strappy config</li>
            </ul>
          </div>
          <div className=" container-title mb-1 mt-4">
            <p className="text-4xl flex content-center items-center">
              Strappy content
              <div
                className="tooltip tooltip-right px-3"
                data-tip="testo da inserire"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="stroke-gray-200"
                  className="w-11 h-11"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
            </p>
          </div>
        </div>
        <div className="form-container my-1 mx-4">
          <div className="p-10 border border-gray bg-white">
            <div className="toast toast-top toast-end">
              <div className="alert alert-error rounded-none">
                <div>
                  <span>Message sent successfully.</span>
                </div>
              </div>
            </div>

            <div className="alert alert-warning shadow-lg rounded-none my-10">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-11 w-11"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="w-11 h-11 stroke-orange-600 fill-white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-xs">
                  Warning: Invalid email token della mamma!
                </span>
              </div>
            </div>

            <div className="form-control w-full ">
              <div className="flex ">
                <div className="w-1/5 ">
                  <label className="label justify-end ">
                    <span className="label-text font-semibold text-xl mr-10">
                      Configuration url
                    </span>
                  </label>
                </div>
                <div className="w-4/5 ">
                  <input
                    type="text"
                    placeholder="configuration url"
                    className="input input-bordered w-full rounded-none input-md"
                  />

                  <label className="label">
                    <span className="label-text-alt text-red-600 text-xl">
                      Error section
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-control w-full ">
              <div className="flex ">
                <div className="w-1/5 ">
                  <label className="label justify-end ">
                    <span className="label-text font-semibold text-xl mr-10">
                      Strappy token
                    </span>
                  </label>
                </div>
                <div className="w-4/5 ">
                  <input
                    type="text"
                    placeholder="Insert a valid strapi token"
                    className="input input-bordered w-full rounded-none input-md "
                  />
                  <label className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                    <span className="label-text-alt">Bottom Right label</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn rounded-none bg-blue-900 text-xl text-white">Save</button>
          </div>
        </div>
        <div className="alert alert-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill=""
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-11 h-11 stroke-red-600 fill-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-xl">Hey there is a problem!</p>
        </div>

        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-11 h-11 stroke-orange-600 fill-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <p className="text-xl">Warning: Invalid email token della mamma!</p>
        </div>
        <div role="tooltip" className="fade in popover left arrow-pop">
          <div className="arrow"></div>
          <div className="popover-content">
            <p>
              <span>
                Entando Hub is a repository from which users can install
                different widgets, components, fragments, page templates,
                content templates and content types.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormMocked
