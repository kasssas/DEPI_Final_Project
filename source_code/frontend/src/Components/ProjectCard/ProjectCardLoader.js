import ContentLoader from 'react-content-loader';

const ProjectCardLoader = () => (
  // <ContentLoader 
  //   speed={1}
  //   width={700}
  //   height={300}
  //   viewBox="0 0 700 300"
  //   backgroundColor="#dee2e6"
  //   foregroundColor="#ff9ed6"
  // >
  //   <rect x="12" y="35" rx="0" ry="0" width="6" height="246" /> 
  //   <rect x="14" y="34" rx="0" ry="0" width="408" height="6" /> 
  //   <rect x="416" y="34" rx="0" ry="0" width="6" height="246" /> 
  //   <rect x="12" y="276" rx="0" ry="0" width="408" height="6" /> 
  //   <rect x="150" y="53" rx="6" ry="6" width="127" height="15" /> 
  //   <rect x="37" y="77" rx="7" ry="7" width="361" height="139" /> 
  //   <rect x="58" y="225" rx="0" ry="0" width="316" height="8" /> 
  //   <rect x="86" y="238" rx="0" ry="0" width="267" height="8" /> 
  //   <rect x="58" y="252" rx="0" ry="0" width="316" height="8" />
  // </ContentLoader>



  <div className="p-0 col-lg-5">
    <ContentLoader
      speed={1}
      width="100%"
      backgroundColor="#dee2e6"
      foregroundColor="#ff9ed6"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      {/* <circle cx="30" cy="130" r="20" />
      <rect x="70" y="120" rx="3" ry="3" width="50" height="20" />
      <rect x="130" y="120" rx="3" ry="3" width="150" height="10" />
      <rect x="130" y="140" rx="3" ry="3" width="100" height="10" />
      <rect x="0" y="170" rx="3" ry="3" width="100" height="10" /> */}
    </ContentLoader>
  </div>


  // <ContentLoader
  //   speed={2}
  //   width={400}
  //   height={200}
  //   viewBox="0 0 400 200"
  //   backgroundColor="#f3f3f3"
  //   foregroundColor="#ecebeb"
  // >
  //   <rect x="0" y="0" rx="3" ry="3" width="100%" height="150" />
  //   <circle cx="30" cy="30" r="20" />
  //   <rect x="70" y="10" rx="3" ry="3" width="300" height="20" />
  //   <rect x="70" y="40" rx="3" ry="3" width="200" height="10" />
  //   <rect x="70" y="60" rx="3" ry="3" width="150" height="10" />
  //   <rect x="70" y="80" rx="3" ry="3" width="100" height="10" />
  // </ContentLoader>


);

export default ProjectCardLoader;