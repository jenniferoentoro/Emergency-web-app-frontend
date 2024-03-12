interface BottomFormProps {
  title: string;
  link: string;
  option: string;
}

const BottomForm = ({ title, link, option }: BottomFormProps) => {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-9">
          <div className="flex justify-center items-center mt-4">
            <div className="w-1/4 h-px bg-gray-400" />
            <div className="mx-4 text-gray-400">or using</div>
            <div className="w-1/4 h-px bg-gray-400" />
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-5">
          <a
            href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
            rel="noreferrer"
          >
            <img
              src="images/google-logo.png"
              className="d-inline align-top w-12 rounded-full float-right"
              alt="Google"
            />
          </a>
        </div>
        <div className="col-5">
          <a
            href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="images/fb-logo.png"
              className="d-inline-block align-top w-11 rounded-full float-left"
              alt="Facebook"
            />
          </a>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-9">
          <p className="text-black-400 mt-1">
            {title}
            <a href={`/${link}`} className="text-[#a42c24]">
              {option} here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomForm;
