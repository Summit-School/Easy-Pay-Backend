export default function email(subject: string, message: string) {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"
      integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <title>Easy Pay</title>
    <style>
      .wrapper {
        width: 60%;
        margin: auto;
        background-color: whitesmoke;
        margin-top: 30px;
        margin-bottom: 30px;
      }

      header {
        background-color: blue;
        padding: 20px;
        color: white;
      }
      .logo {
        text-align: center;
        margin-top: 20px;
      }

      .body-text {
        text-align: left;
        margin-top: 20px;
        padding: 0 20px;
        min-height: 300px;
      }
      footer {
        background-color: grey;
        padding: 20px;
        text-align: center;
        color: whitesmoke;
      }
      footer a {
        text-decoration: none;
        color: whitesmoke;
      }
      /* Extra small devices (phones, 600px and down) */
      @media only screen and (max-width: 600px) {
        .wrapper {
          width: 99%;
        }
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <header>
        <h2>Easy Kings Pay</h2>
        ${subject}
      </header>
      <div class="logo">
        <a
          style="width: 100%"
          href="https://lh3.googleusercontent.com/9mnpqsUwcKYqK3nhF1RszuJYbGdCqv18fGKcV7HTtxpUCAsco8WHyaw1r0DgvHAScEg=w2400?source=screenshot.guru"
        >
          <img
            style="width: 25%"
            src="https://lh3.googleusercontent.com/9mnpqsUwcKYqK3nhF1RszuJYbGdCqv18fGKcV7HTtxpUCAsco8WHyaw1r0DgvHAScEg=w800-h800-p"
          />
        </a>
      </div>
      <div class="body-text">
        <p>${message}</p>
      </div>
      <!-- <div>
          <h5>Socials</h5>
          <div class="p-2">
            <a href="#"
              ><i
                class="bi bi-facebook text-danger m-1 rounded-circle"
                style="font-size: 1.5rem"
              ></i
            ></a>
            <a href="#">
              <i
                class="bi bi-instagram text-danger m-1 rounded-circle"
                style="font-size: 1.5rem"
              ></i
            ></a>
            <a href="#"
              ><i
                class="bi bi-linkedin text-danger m-1 rounded-circle"
                style="font-size: 1.5rem"
              ></i
            ></a>
          </div>
        </div> -->
      <footer>
      <!-- <p>
          <a href="#">Privacy Policy</a> |
          <a href="#">Contact Support</a>
        </p> -->
        <p>&copy; 2023 Easy Kings Pay</p>
      </footer>
    </div>
  </body>
</html>
        `;
}
