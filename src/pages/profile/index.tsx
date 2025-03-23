import { HiOutlineUserCircle } from "solid-icons/hi";
import PageTitle from "~/components/common/PageTitle";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Col, Grid } from "~/components/ui/grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

const Profile = () => {
  return (
    <div class="space-y-8">
      <PageTitle title="Profile" />

      <div class="space-y-2">
        <Tabs defaultValue="general">
          <TabsList class="bg-accent">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Grid cols={4} class="gap-6">
              <Col span={3}>
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>
                      Update your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form class="space-y-4">
                      <TextField>
                        <TextFieldLabel>First Name</TextFieldLabel>
                        <TextFieldInput />
                      </TextField>
                      <TextField>
                        <TextFieldLabel>Last Name</TextFieldLabel>
                        <TextFieldInput />
                      </TextField>
                      <TextField>
                        <TextFieldLabel>Email</TextFieldLabel>
                        <TextFieldInput type="email" />
                      </TextField>
                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </Col>
              <Col span={1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                      Update your profile picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="col"
                      class="gap-6"
                    >
                      <HiOutlineUserCircle class="size-12" />
                      <Button variant="outline">Upload New Picture</Button>
                    </Flex>
                  </CardContent>
                </Card>
              </Col>
            </Grid>
          </TabsContent>
          <TabsContent value="password">
            <Grid cols={4} class="gap-6">
              <Col span={3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form class="space-y-4">
                      <TextField>
                        <TextFieldLabel>Current Password</TextFieldLabel>
                        <TextFieldInput type="password" />
                      </TextField>
                      <TextField>
                        <TextFieldLabel>New Password</TextFieldLabel>
                        <TextFieldInput type="password" />
                      </TextField>
                      <TextField>
                        <TextFieldLabel>Confirm Password</TextFieldLabel>
                        <TextFieldInput type="password" />
                      </TextField>
                      <Button>Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </Col>
            </Grid>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
