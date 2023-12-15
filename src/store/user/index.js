import StoreModule from "../module";

class User extends StoreModule {

  initState() {
    return {
      token: "",
      user: {
        _id: "",
        email: "",
        profile: {
          name: "",
          phone: "",
        },
      },
      error: "",
      waiting: false,
    };
  }

  resetState() {
    this.setState({
      ...this.initState(),
    })
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
      const response = await fetch("/api/v1/users/self?fields=*", {
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
            email: json.result.email,
            profile: {
              name: json.result.profile.name,
              phone: json.result.profile.phone,
            },
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

export default User;
