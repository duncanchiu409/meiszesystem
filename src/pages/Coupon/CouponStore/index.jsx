import { useTranslation } from "react-i18next";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import image from "./game.jpg";

const cards = [
  {
    id: 1,
    img: './game.jpg',
    title: "Card X",
    points: 200,
    details: "This is the coupon's description. Please feel to free to switch the coupon."
  },
  {
    id: 2,
    img: './game.jpg',
    title: "Card X",
    points: 200,
    details: "This is the coupon's description. Please feel to free to switch the coupon."
  },
  {
    id: 3,
    img: './game.jpg',
    title: "Card X",
    points: 200,
    details: "This is the coupon's description. Please feel to free to switch the coupon."
  },
  {
    id: 4,
    img: './game.jpg',
    title: "Card X",
    points: 200,
    details: "This is the coupon's description. Please feel to free to switch the coupon."
  },
  {
    id: 5,
    img: './game.jpg',
    title: "Card X",
    points: 200,
    details: "This is the coupon's description. Please feel to free to switch the coupon."
  }
]

function CouponStore() {
  const { t } = useTranslation();

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <div className="text-end">
            <h1>{t("table.Coupon Store")}</h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
            >
              {cards.map((coupon) => (
                <Card
                sx={{
                  bgcolor: "transparent",
                  color: "var(--sidebar-font-color)",
                  maxHeight: "700px",
                }}
                key={coupon.id}
              >
                <CardMedia
                  component="img"
                  image={image}
                  sx={{ padding: "10px" }}
                />
                <CardContent>
                  <h3 style={{ textAlign: "left" }}>{coupon.title}</h3>
                  <p style={{ textAlign: "left", marginBottom: "0" }}>
                    {coupon.details}
                  </p>
                </CardContent>
                <CardActions>
                  <label className="file-upload-btn">
                    <MonetizationOnOutlinedIcon />
                    {coupon.points} pts
                  </label>
                  <button
                    style={{
                      marginBottom: 0,
                      fontSize: "medium",
                      display: "flex",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <ChangeCircleOutlinedIcon />
                    Claim Coupon
                  </button>
                </CardActions>
              </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponStore;
