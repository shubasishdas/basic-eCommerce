import { Container, Card, Grid, Header, Input } from "semantic-ui-react";

const Shipping = () => {
  return (
    <Card style={{ width: "100%", margin: 0, padding: 10 }}>
      <Grid
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Header style={{ padding: 0 }}>Shipping Address</Header>
        <Container style={{ display: "flex", gap: 10 }}>
          <Input style={{ flex: 1 }} placeholder="first name" />
          <Input style={{ flex: 1 }} placeholder="last name" />
        </Container>

        <Container style={{ display: "flex", gap: 10 }}>
          <Input style={{ flex: 1 }} placeholder="state" />
          <Input style={{ flex: 1 }} placeholder="city" />
        </Container>

        <Container>
          <Input style={{ flex: 1 }} fluid placeholder="Address Details" />
        </Container>
        <Container>
          <Input style={{ flex: 1 }} fluid placeholder="contact number" />
        </Container>
      </Grid>
    </Card>
  );
};

export default Shipping;
