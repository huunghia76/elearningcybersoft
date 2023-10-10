import { AccountHistoryBooking, AccountInfo, Tabs } from "components";

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
            key: "accountHistoryBooking",
            label: "Lịch sử đặt vé",
            children: <AccountHistoryBooking />,
          },
        ]}
      />
    </div>
  );
};
