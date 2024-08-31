import React, { useEffect, useState } from "react";
import { Layout, Button, Modal, Input, Typography } from "antd";
import BottomFooter from "../components/BottomFooter";
import {
  Circle,
  Map as KakaoMap,
  MapMarker,
  Polygon,
} from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBurger,
  faHouse,
  faLocation,
  faLocationDot,
  faMugHot,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const { Content } = Layout;
const CategoryData = {
  CE7: {
    name: "카페",
    icon: faMugHot,
    iconImage: "/icons/mug_hot_icon.png",
  },
  FD6: {
    name: "음식점",
    icon: faBurger,
    iconImage: "/icons/burger_food_icon.png",
  },
  AT4: {
    name: "관광명소",
    icon: faPlane,
    iconImage: "/icons/plane_icon.png",
  },
  CT1: {
    name: "문화시설",
    icon: faHouse,
    iconImage: "/icons/house_icon.png",
  },
  WORK: {
    name: "알바",
    icon: faBriefcase,
    iconImage: "/icons/briefcase_suitcase_icon.png",
  },
  CUSTOM: {
    name: "기록",
    icon: faLocationDot,
    iconImage: "/icons/location_dot_icon.png",
  },
};

const Map = () => {
  const LIMIT_METER = 500;
  const EARTH_RADIUS = 6371000;

  /**
   * @typedef Position
   * @prop {number} lat
   * @prop {number} lng
   *
   * @typedef Marker
   * @prop {Position} position
   * @prop {string} content
   * @prop {string} category
   */

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalPlace, setModalPlace] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  /** @type {ReturnType<typeof useState<Position | undefined>>} */
  const [modalPosition, setModalPosition] = useState();

  const [resetKey, setResetKey] = useState(0);

  /** @type {ReturnType<typeof useState<kakao.maps.Map>>} */
  const [map, setMap] = useState(null);

  /** @type {ReturnType<typeof useState<Marker[]>>} */
  const [markers, setMarkers] = useState([]);

  /** @type {ReturnType<typeof useState<Marker>>} */
  const [info, setInfo] = useState();

  /** @type {ReturnType<typeof useState<string[]>>} */
  const [categories, setCategories] = useState([]);

  /** @type {ReturnType<typeof useState<Position[]>>} */
  const [hole, setHole] = useState([]);

  /** @type {ReturnType<typeof useState<Position>>} */
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });

  /** @type {ReturnType<typeof useState<Position | undefined>>} */
  const [clickPos, setClickPos] = useState();

  /**
   * @param {Position} center
   * @param {number} radius
   * @param {number} angle
   * @returns {Position}
   */
  const computeOffset = (center, radius, angle) => {
    const delta = radius / EARTH_RADIUS;
    const theta = (angle * Math.PI) / 180;

    const lat1 = (center.lat * Math.PI) / 180;
    const lng1 = (center.lng * Math.PI) / 180;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(delta) +
        Math.cos(lat1) * Math.sin(delta) * Math.cos(theta)
    );

    const lng2 =
      lng1 +
      Math.atan2(
        Math.sin(theta) * Math.sin(delta) * Math.cos(lat1),
        Math.cos(delta) - Math.sin(lat1) * Math.sin(lat2)
      );

    return {
      lat: (lat2 * 180) / Math.PI,
      lng: (lng2 * 180) / Math.PI,
    };
  };

  /**
   * @param {Position} center
   * @param {number} radius
   * @returns {Position[]}
   */
  const getCirclePoints = (center, radius) => {
    const points = [];
    const numSegments = 360;

    for (let i = 0; i < numSegments; i++) {
      const angle = i * (360 / numSegments);
      const point = computeOffset(center, radius, angle);
      points.push(point);
    }

    points.push(points[0]);

    return points;
  };

  /**
   * @param {Position} point1
   * @param {Position} point2
   * @returns {number}
   */
  const haversineDistance = (point1, point2) => {
    const toRadians = (angle) => (angle * Math.PI) / 180;

    const lat1 = toRadians(point1.lat);
    const lng1 = toRadians(point1.lng);
    const lat2 = toRadians(point2.lat);
    const lng2 = toRadians(point2.lng);

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
  };

  const getUserId = async () => {
    const res = await axios.get("https://10.223.126.146:443/user-info", {
      withCredentials: true,
    });
    return res.data.userId;
  };

  const setPosWithGPS = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setCenter(
          // eslint-disable-next-line no-undef
          new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
        );
        setHole(
          getCirclePoints(
            { lat: pos.coords.latitude, lng: pos.coords.longitude },
            LIMIT_METER
          )
        );
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        alert("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (!modalPlace || !modalTitle || !modalContent || !modalPosition) return;
    setConfirmLoading(true);
    const res = await axios.post("https://10.223.126.146:443/communityList", {
      placeName: modalPlace,
      userId: await getUserId(),
      x: modalPosition.lng,
      y: modalPosition.lat,
    });
    await axios.post(`https://10.223.126.146:443/community`, {
      listId: res.data.id,
      title: modalTitle,
      content: modalContent,
    });
    await searchPlaces(map);
    setClickPos(undefined);
    setConfirmLoading(false);
    handleCancel();
  };

  // close and resets
  const handleCancel = () => {
    setOpen(false);
    setModalPlace("");
    setModalTitle("");
    setModalContent("");
    setModalPosition(undefined);
  };

  useEffect(() => {
    if (!map) return;
    map.setMaxLevel(5);
    setPosWithGPS();
  }, [map]);

  useEffect(() => {
    if (!map) return;

    searchPlaces(map);
  }, [map, categories, center]);

  /**
   * @param {kakao.maps.Map} map
   * */
  const searchPlaces = async (map) => {
    const promises = [];

    // eslint-disable-next-line no-undef
    const ps = new kakao.maps.services.Places();

    const kakaoSearch = (category, bounds) => {
      return new Promise((res, rej) => {
        ps.categorySearch(
          category,
          (data, status) => {
            if (
              // eslint-disable-next-line no-undef
              status !== kakao.maps.services.Status.OK &&
              // eslint-disable-next-line no-undef
              status !== kakao.maps.services.Status.ZERO_RESULT
            ) {
              return rej(status);
            }
            return res(
              data.map((e) => ({
                position: {
                  lat: e.y,
                  lng: e.x,
                },
                content: e.place_name,
                category,
              }))
            );
          },
          { bounds }
        );
      });
    };

    const albamonSearch = async (category, bounds) => {
      const res = await axios.post("https://10.223.126.146:443/albamon", [
        {
          lat: bounds.getSouthWest().getLat(),
          lng: bounds.getSouthWest().getLng(),
        },
        {
          lat: bounds.getNorthEast().getLat(),
          lng: bounds.getNorthEast().getLng(),
        },
      ]);
      return res.data.map((e) => {
        return {
          id: e.id,
          position: {
            lat: e.latitude,
            lng: e.longitude,
          },
          content: `${e.title}\n${e.company}\n${e.payType} ${e.pay}`,
          category,
        };
      });
    };

    const customSearch = async (category) => {
      const userId = await getUserId();
      const res = await axios.get(
        `https://10.223.126.146:443/communityList/${userId}`
      );
      return res.data.map((e) => {
        return {
          id: e.id,
          position: {
            lat: e.y,
            lng: e.x,
          },
          content: e.placeName,
          category,
        };
      });
    };

    const search = (category, bounds) => {
      switch (category) {
        case "WORK":
          return albamonSearch(category, bounds);
        case "CUSTOM":
          return customSearch(category);
        default:
          return kakaoSearch(category, bounds);
      }
    };

    // eslint-disable-next-line no-undef
    let circleBounds = new kakao.maps.LatLngBounds();
    for (let i of hole) {
      // eslint-disable-next-line no-undef
      circleBounds.extend(new kakao.maps.LatLng(i.lat, i.lng));
    }

    let circleSw = circleBounds.getSouthWest();
    let circleNe = circleBounds.getNorthEast();

    let mapBounds = map.getBounds();
    let mapSw = mapBounds.getSouthWest();
    let mapNe = mapBounds.getNorthEast();

    // eslint-disable-next-line no-undef
    let sw = new kakao.maps.LatLng(
      Math.max(circleSw.getLat(), mapSw.getLat()),
      Math.max(circleSw.getLng(), mapSw.getLng())
    );
    // eslint-disable-next-line no-undef
    let ne = new kakao.maps.LatLng(
      Math.min(circleNe.getLat(), mapNe.getLat()),
      Math.min(circleNe.getLng(), mapNe.getLng())
    );

    // eslint-disable-next-line no-undef
    let bounds = new kakao.maps.LatLngBounds(sw, ne);

    promises.push(...categories.map((category) => search(category, bounds)));

    /** @type {{position: {lat: number, lng: number}, content: string, category: string}[]}  */
    let result = (await Promise.all(promises)).flat();

    for (let i = 0; i < result.length; i++) {
      if (
        haversineDistance(
          { lat: result[i].position.lat, lng: result[i].position.lng },
          center
        ) > LIMIT_METER
      ) {
        result.splice(i, 1);
        i--;
      }
    }

    setMarkers(result);
  };

  const toggleCategory = (category) => {
    if (category === "CUSTOM") {
      setClickPos(undefined);
    }
    if (categories.includes(category)) {
      setCategories(categories.filter((e) => e !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 20px", flex: 1 }}>
        <KakaoMap
          center={{ lat: 37.5665, lng: 126.978 }}
          style={{
            background: "#fff",
            padding: 24,
            margin: "16px 0",
            minHeight: "calc(100vh - 134px)",
            borderRadius: "10px",
          }}
          onCreate={(map) => {
            setMap(map);
          }}
          onDragEnd={(map) => {
            searchPlaces(map);
          }}
          onZoomChanged={(map) => {
            searchPlaces(map);
          }}
          onClick={(map, event) => {
            // console.log(event.latLng.getLat(), event.latLng.getLng());
            setClickPos({
              lat: event.latLng.getLat(),
              lng: event.latLng.getLng(),
            });
            setResetKey(resetKey + 1);
          }}
        >
          {markers.map((marker) => (
            <MapMarker
              image={{
                src: CategoryData[marker.category].iconImage,
                size: {
                  width: 24,
                  height: 24,
                },
              }}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                setInfo(marker);
              }}
            >
              {info && info.content === marker.content && (
                <div
                  onClick={() => {
                    info.category === "WORK" &&
                      window.open(
                        `https://www.albamon.com/jobs/detail/${info.id}`
                      );
                    info.category === "CUSTOM" && alert("not implemented");
                  }}
                  style={{
                    padding: "5px",
                    color: "#000",
                    whiteSpace: "pre-line",
                  }}
                >
                  {marker.content}
                </div>
              )}
            </MapMarker>
          ))}
          {categories.includes("CUSTOM") && clickPos && (
            <MapMarker
              key={resetKey}
              image={{
                src: CategoryData["CUSTOM"].iconImage,
                size: {
                  width: 24,
                  height: 24,
                },
              }}
              position={clickPos}
            >
              <div
                style={{
                  padding: "5px",
                  color: "#000",
                  width: 200,
                  height: 200,
                }}
              >
                <div>asdf</div>
                <div>asdf</div>
                <Button
                  style={{
                    position: "absolute",
                    bottom: 7,
                    width: 188,
                    overflow: "hidden",
                  }}
                  type="primary"
                  onClick={() => {
                    setModalPosition(clickPos);
                    showModal();
                  }}
                >
                  등록하기
                </Button>
                <Modal
                  title="기록"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Input
                    value={modalPlace}
                    onChange={(e) => setModalPlace(e.target.value)}
                    style={{ marginBottom: 10 }}
                    placeholder="장소 이름"
                  />
                  <Input
                    value={modalTitle}
                    onChange={(e) => setModalTitle(e.target.value)}
                    style={{ marginBottom: 10 }}
                    placeholder="제목"
                  />
                  <TextArea
                    value={modalContent}
                    onChange={(e) => setModalContent(e.target.value)}
                    rows={15}
                    placeholder="내용"
                  />
                </Modal>
              </div>
            </MapMarker>
          )}
          <Polygon
            path={[
              [
                { lat: 30, lng: 120 },
                { lat: 50, lng: 120 },
                { lat: 50, lng: 140 },
                { lat: 30, lng: 140 },
              ],
              hole,
            ]}
            strokeWeight={0}
            fillColor={"#000"}
            fillOpacity={0.5}
          ></Polygon>
          <Circle
            center={center}
            radius={20}
            strokeWeight={3}
            strokeColor={"#75B8FA"}
            strokeOpacity={1}
            fillColor={"#CFE7FF"}
            fillOpacity={0.7}
          />
        </KakaoMap>
        <div
          style={{ position: "absolute", zIndex: 99999999, top: 30, left: 30 }}
        >
          {Object.entries(CategoryData).map(([key, value]) => {
            return (
              <Button
                type={categories.includes(key) ? "primary" : "default"}
                style={{
                  display: "inline-block",
                  width: 56,
                  height: 56,
                  padding: 0,
                }}
                onClick={() => toggleCategory(key)}
              >
                <FontAwesomeIcon
                  icon={value.icon}
                  style={{ display: "block", fontSize: "24px", margin: "auto" }}
                />
                {value.name}
              </Button>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 99999999,
            top: "calc(100vh - 185px)",
            right: 30,
          }}
        >
          <Button
            style={{
              display: "inline-block",
              width: 56,
              height: 56,
              padding: 0,
            }}
            onClick={() => setPosWithGPS()}
          >
            <FontAwesomeIcon
              icon={faLocation}
              style={{ display: "block", fontSize: "24px", margin: "auto" }}
            />
          </Button>
        </div>
      </Content>
      <BottomFooter />
    </Layout>
  );
};

export default Map;
