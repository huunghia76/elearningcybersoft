

import styled from "../../../assets/mainLayout.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { useEffect } from 'react'
import { getDanhMucKhoaHocThunk, getKhoaHocByDanhMucThunk } from "store/quanLyKhoaHoc";
import TabPane from "antd/es/tabs/TabPane";
import { useState } from 'react';
import { CourseItem } from "./CourseItem";
import { Tabs } from "..";
import { Card, Skeleton } from "antd";

export const CourseUi = () => {
   const dispatch = useAppDispatch();
   const { isFetchingKhoaHocList, DanhMucKhoaHocList, KhoaHocListByDanhMuc } = useSelector(
      (state: RootState) => state.quanLyKhoaHoc
   );

   const [keyTab, setKeyTab] = useState<string>('BackEnd')

   useEffect(() => {
      const fetchData = async () => {
         await dispatch(getDanhMucKhoaHocThunk())
         await dispatch(getKhoaHocByDanhMucThunk(keyTab));
      };
      fetchData();
   }, [dispatch, keyTab]);


   const onChange = async (key: string) => {
      setKeyTab(key)
      dispatch(getKhoaHocByDanhMucThunk(key));

   };

   if (isFetchingKhoaHocList) {
      return (
         <div className="flex justify-evenly flex-wrap">
            {[...Array(4)].map((_,index) => {
               return (
                  <Card key={index} className="!w-[300px] !mt-20" >
                     <Skeleton.Image className="!w-full !h-[250px]" />
                     <Skeleton.Input className="!w-full mt-16" />
                     <Skeleton.Input className="!w-full mt-16" />
                  </Card>
               );
            })}
         </div>);
   }
   return (
      <>
         <Tabs
            defaultActiveKey={keyTab}
            onChange={onChange}
            className={styled.tabsAntd}
         >
            {DanhMucKhoaHocList?.map(item => (
               <TabPane tab={item.tenDanhMuc} key={item.maDanhMuc}>
                  <div className="flex justify-evenly flex-wrap">
                     {KhoaHocListByDanhMuc?.map((khoaHoc) => (
                        <CourseItem key={khoaHoc.maKhoaHoc} khoaHoc={khoaHoc}></CourseItem>
                     ))}
                  </div>
               </TabPane>
            ))}
         </Tabs>
      </>
   )
}
