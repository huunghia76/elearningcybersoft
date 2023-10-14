

import  Banner  from 'components/ui/Banner';
import {CourseUi} from 'components/ui/client/CourseUi';

export const HomeTemplate = () => {
   return (
      <div> 
         <Banner></Banner>
         
         <CourseUi></CourseUi>
      </div>
   )
}
