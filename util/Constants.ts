import * as dotenv from "dotenv";

export class Constants {
  public static readonly GuineaPigPageUrl = () => {
    dotenv.config();
    return process.env.SAUCELABS_URI + "/test/guinea-pig";
  };

  static LocatorIds = class {
    public static readonly IAmAnId = "#i_am_an_id";
    public static readonly Appear3Times = "text=/^i appear 3 times$/i";
    public static readonly Body = "body";
  };

  static Texts = class {
    public static readonly IAmSomePageContent = "I am some page content";
    public static readonly IAmInvisible = "i am invisible";
    public static readonly YourComments = "Your comments:";
    public static readonly ClientTime = "Client time:";
  };

  static Labels = class {
    public static readonly Email = /^Email:?$/;
    public static readonly Comments = /^Comments:?$/;
  };

  static Roles = class {
    public static readonly Heading = "heading";
    public static readonly Link = "link";
  };
}
