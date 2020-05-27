import React, { Component, ReactNode, ErrorInfo } from "react";
import { Updates } from "expo";
import { AppText } from "../Layout/AppText";
import { StyleSheet, View, Linking } from "react-native";
import { size, fontSize, color } from "../../common/styles";
import { DarkButton } from "../Layout/Buttons/DarkButton";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";

const styles = StyleSheet.create({
	wrapper: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: size(5)
	},
	content: {
		width: 512,
		maxWidth: "100%",
		marginTop: -size(4)
	},
	emoji: {
		fontSize: fontSize(5)
	},
	heading: {
		fontFamily: "brand-bold",
		fontSize: fontSize(5)
	},
	feedback: {
		marginTop: size(1),
		fontSize: fontSize(2)
	},
	errorDescription: {
		marginTop: size(2),
		fontFamily: "brand-italic",
		fontSize: fontSize(-1),
		color: color("grey", 40)
	},
	emailLink: {
		fontFamily: "brand-italic",
		fontSize: fontSize(-1),
		textDecorationLine: "underline",
		color: color("blue", 40)
	},
	restartButton: {
		alignSelf: "flex-start",
		marginTop: size(5)
	}
});

type State = { hasError: boolean; errorMessage?: Error };

export class ErrorBoundary extends Component<{}, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, errorMessage: error };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.log(error + "\n" + info.componentStack)
	}

	render(): ReactNode {
		const error = `(${this.state.errorMessage?.name}: ${this.state.errorMessage?.message} ${format(
			Date.now(),
			"hh:mm a, do MMMM"
		)})`;
		const supportLink = `https://openattestation.com/`;

		return this.state.hasError ? (
			<View style={styles.wrapper} testID="error-boundary">
				<View style={styles.content}>
					<AppText style={styles.emoji}>😓</AppText>
					<AppText style={styles.heading}>Paiseh...</AppText>
					<AppText style={styles.feedback}>
						ID Wallet has encountered an issue. We&apos;ve noted this down and
						are looking into it!
          </AppText>
					{this.state.errorMessage && (
						<>
							<AppText style={styles.errorDescription}>
								If this persists, submit a request on{" "}
								<AppText
									style={styles.emailLink}
									onPress={() => Linking.openURL(supportLink)}
								>
									https://safeentry.zendesk.com
                </AppText>
							</AppText>
							<AppText style={styles.errorDescription} testID="error-text">{error}</AppText>
						</>
					)}
					<View style={styles.restartButton}>
						<DarkButton
							text="Restart app"
							onPress={() => Updates.reload()}
							icon={
								<Feather
									name="refresh-cw"
									size={size(2)}
									color={color("grey", 0)}
								/>
							}
						/>
					</View>
				</View>
			</View>
		) : (
				this.props.children
			);
	}
}
