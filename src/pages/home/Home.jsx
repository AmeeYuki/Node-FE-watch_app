import { AutoComplete, ConfigProvider, Flex, Input, Select } from "antd";
import React, { useState } from "react";
import WatchList from "./WatchList";
import {
  useGetAllBrandQuery,
  useGetAllWatchQuery,
} from "../../services/watchAPI";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const {
    data: watches,
    isLoading: isLoadingWatches,
    refetch: refetchWatch,
  } = useGetAllWatchQuery();

  const {
    data: brands,
    isLoading: isLoadingBrands,
    refetch: refetchBrand,
  } = useGetAllBrandQuery();

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  // Hàm xử lý thay đổi lựa chọn brand
  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const filteredWatches = watches
    ? watches.filter((watch) => {
        const matchesSearch =
          watch.watchName.toLowerCase().includes(searchValue.toLowerCase()) ||
          !searchValue;

        const matchesBrand =
          selectedBrand === "" || watch?.brand?.brandName === selectedBrand;

        return matchesSearch && matchesBrand;
      })
    : [];

  // Tạo danh sách brandOptions từ dữ liệu brands
  const brandOptions = brands
    ? brands.map((brand) => ({
        value: brand.brandName,
        label: brand.brandName,
      }))
    : [];

  return (
    <div className="home-page">
      <div className="header">
        <div className="title">
          <p>Home page:</p>
        </div>
        <hr />
        <Flex
          className="action"
          style={{ marginTop: 10 }}
          justify="space-between"
          align="center"
        >
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 20,
              },
            }}
          >
            {/* AutoComplete cho tìm kiếm */}
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={500}
              style={{ width: 300 }}
              size="large"
              onSearch={handleSearch}
              defaultValue={searchValue}
            >
              <Input.Search size="large" placeholder="Search watch" />
            </AutoComplete>
          </ConfigProvider>
          <div>
            <Flex align="center" gap={10}>
              {/* Select cho lọc theo brand */}
              <h4>Filter:</h4>
              <Select
                defaultValue="All"
                placeholder="Select Brand"
                style={{ width: 120 }}
                options={[{ value: "", label: "All" }, ...brandOptions]}
                onChange={handleBrandChange}
              />
            </Flex>
          </div>
        </Flex>
      </div>
      <div className="body">
        {/* Truyền danh sách watches đã lọc vào WatchList component */}
        <WatchList watches={filteredWatches} />
      </div>
    </div>
  );
};

export default Home;
