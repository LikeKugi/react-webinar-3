import StoreModule from "../module";

class User extends StoreModule {

  initState() {
    return {
      token: "",
      user: {
        _id: "",
        profile: {
          name: "",
          phone: "",
          email: "",
        },
      },
      error: "",
      waiting: false,
    };
  }

  setToken(token) {
    this.setState({
      ...this.getState(),
      token,
    })
  }

  async loginUser({login, password}) {
    this.setState({
      ...this.initState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password})
      });
      const json = await response.json();

      if (response.ok) {
        this.setState({
          token: json.result.token,
          user: {
            _id: json.result.user._id,
            profile: {
              name: json.result.user.profile.name,
              phone: json.result.user.profile.phone,
              email: json.result.user.profile.email,
            },
          },
          error: "",
          waiting: false,
        });
      } else {
        this.setState({
          ...this.getState(),
          error: json.error.data?.issues[0].message || json.error.message,
          waiting: false,
        })
      }


    } catch (e) {
      this.setState({
        ...this.initState(),
        error: e.data?.issues[0].message || e.message,
        waiting: false,
      });
    }
  }

  async logoutUser() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });
      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.initState(),
        })
      } else {
        this.setState({
          ...this.initState(),
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
      });
    }
  }

  async selfUser() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        }
      });
      const json = await response.json();

      if (response.ok) {
        this.setState({
          ...this.initState(),
          user: {
            _id: json.result._id,
            profile: {
              name: json.result.profile.name,
              phone: json.result.profile.phone,
              email: json.result.profile.email,
            },
          }
        })
      } else {
        this.setState({
          ...this.initState(),
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
        waiting: false,
      });
    }
  }
}

export default User;
