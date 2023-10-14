import { AccountHistoryRegisterCourse, AccountInfo, Tabs } from "components";

export const AccountTemplate = () => {
   return (
      <div>
         <Tabs
            tabPosition="left"
            items={[
               {
                  key: "accountInfo",
                  label: "Thông tin tài khoản",
                  children: <AccountInfo />,
               },
               {
                  key: "accountHistoryRegisterCourse",
                  label: "Khóa học của tôi",
                  children: <AccountHistoryRegisterCourse />,
               },
            ]}
         />
      </div>
   );
};
