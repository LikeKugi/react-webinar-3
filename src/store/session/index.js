import StoreModule from "../module";

class Session extends StoreModule {

  initState() {
    return {
      token: "",
      user: {
        _id: "",
        name: "",
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

  resetState() {
    this.setState({
      ...this.initState(),
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
            name: json.result.user.profile.name,
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
    if (!this.getState().token) {
      return
    }
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

  async selfUser(token) {
    if (token) {
      this.setState({
        ...this.getState(),
        token,
      })
    }
    if (!this.getState().token || this.getState().waiting) {
      return
    }
    this.setState({
      ...this.getState(),
      error: '',
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=_id,profile(name)", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        }
      });
      const json = await response.json();

      if (response.ok) {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: '',
          user: {
            _id: json.result._id,
            name: json.result.profile.name,
          }
        })
      } else {
        this.setState({
          ...this.initState(),
          error: json.error.data?.issues[0].message || json.error.message,
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
        error: e.message,
        waiting: false,
      });
    }
  }
}

export default Session;
