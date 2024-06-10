import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Thông tin chung
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đây là đồ án Xây dựng website E-learning cho các khóa học về Công
              Nghệ Thông Tin. Ngoài ra có tích hợp các mô hình ML và AI giúp
              giải quyết những vấn đề tồn đọng trong quá trình học online hiện
              nay. Hiện tại, đồ án đang trong giai đoạn phát triển cho Tiểu luận
              chuyên ngành.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Sinh viên thực hiện
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đặng Quang Trường
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: 21110705@student.hcmute.edu.vn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +84 829 039 202
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Lê Thành Vinh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: 21110940@student.hcmute.edu.vn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +84 911 685 322
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Mạng xã hội
              </Typography>
              <Link
                href="https://www.facebook.com/profile.php?id=100040342220491"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <Facebook />
              </Link>
              <Link
                href="https://github.com/TruongDang23"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                sx={{ pl: 1, pr: 1 }}
              >
                <GitHubIcon />
              </Link>
              <Link
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <Twitter />
              </Link>
            </div>
            <div style={{ marginTop: "65px" }}>
              <Link
                href="https://www.facebook.com/profile.php?id=100016912685197"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <Facebook />
              </Link>
              <Link
                href="https://github.com/Suzukisakae"
                color="inherit"
                target="_blank"
                rel="noreferrer"
                sx={{ pl: 1, pr: 1 }}
              >
                <GitHubIcon />
              </Link>
              <Link
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <Twitter />
              </Link>
            </div>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link
              color="inherit"
              href="https://hcmute.edu.vn/"
              target="_blank"
              rel="noreferrer"
            >
              Trường Đại học Sư phạm Kỹ thuật TP.HCM
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
