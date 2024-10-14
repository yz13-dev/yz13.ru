import "@/globals.css";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../src/components/ui/button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
    rounded: "default",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
    rounded: "default",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
    rounded: "default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
    rounded: "default",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
    rounded: "default",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
    rounded: "default",
  },
};
